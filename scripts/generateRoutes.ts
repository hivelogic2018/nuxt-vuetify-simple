// src/scripts/generateRoutes.ts
import { Eta } from 'eta';
import { readdirSync, writeFileSync } from 'fs';
import * as path from 'path';
import 'reflect-metadata';  // Import reflect-metadata for metadata reflection
import ts = require('typescript');
const { join } = path;

// Template and output paths
const outputPath = join(__dirname, '../src/routes/routes.ts');

// Type for route metadata — adapt as needed
interface Parameter {
  name: string;
  parseParameter: string;
}

interface Method {
  method: string;
  fullPath: string;
  name: string;
  parameters: Parameter[];
}

interface Controller {
  name: string;
  modulePath: string;
  methods: Method[];
}

interface TemplateData {
  controllers: Controller[];
}


// A utility function to load TypeScript files dynamically from a folder
function loadFilesInDir(dir: string): string[] {
  const files: string[] = [];
  const walkDir = (currentDir: string) => {
    const entries = readdirSync(currentDir, { withFileTypes: true });
    entries.forEach((entry) => {
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.isFile() && fullPath.endsWith('.ts')) {
        files.push(fullPath);
      }
    });
  };
  walkDir(dir);
  return files;
}

// Function to extract controller metadata from TypeScript files
function extractControllerMetadata(): Controller[] {
  const controllerFiles = loadFilesInDir(join(__dirname, '../src/controllers'));
  const controllers: Controller[] = [];

  controllerFiles.forEach((file) => {
    const controller: Controller = {
      name: path.basename(file, '.ts'),
      modulePath: `./../controllers/${path.basename(file)}`,
      methods: [],
    };

    const program = ts.createProgram([file], {});
    const checker = program.getTypeChecker();
    const sourceFile = program.getSourceFile(file);

    if (sourceFile) {
      ts.forEachChild(sourceFile, (node) => {
        if (ts.isClassDeclaration(node) && node.name) {
          const className = node.name.text;

          // Look for methods in the class
          ts.forEachChild(node, (methodNode) => {
            if (ts.isMethodDeclaration(methodNode) && methodNode.name) {
              const methodName = methodNode.name.getText();
              const parameters: Parameter[] = [];

              methodNode.parameters.forEach((param) => {
                const paramName = param.name.getText();
                parameters.push({
                  name: paramName,
                  parseParameter: paramName,  // Just using the param name for now, adapt if needed
                });
              });

              // Assuming the method is decorated with TSOA decorators
              const methodMetadata = Reflect.getMetadata('tsoa:route', methodNode);
              if (methodMetadata) {
                controller.methods.push({
                  method: methodMetadata.method,
                  fullPath: methodMetadata.path,
                  name: methodName,
                  parameters,
                });
              }
            }
          });
        }
      });
    }

    if (controller.methods.length > 0) {
      controllers.push(controller);
    }
  });

  return controllers;
}
// ETA instance
const eta = new Eta({ views: join(__dirname, '../') });

// Main function to generate routes
async function generateRoutes() {
  try {
    // Extract the controller metadata
    const controllers = extractControllerMetadata();

    // Prepare the template data
    const templateData: TemplateData = {
      controllers: controllers,
    };

    // Ensure the template exists and render it with Eta
    const output = await eta.render('tsoa-hono-template', templateData);

    if (!output) throw new Error('Failed to render template.');

    // Write the output to the routes file
    writeFileSync(outputPath, output);
    console.log('Routes generated successfully!');
  } catch (err) {
    console.error('Error generating routes:', err);
  }
}

generateRoutes().catch((err) => {
  console.error('Error generating routes:', err);
});