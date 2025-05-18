// WARNING: This file was auto-generated with tsoa for jsdom. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  fetchMiddlewares,
} from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ExampleController } from './../src/controllers/ExampleController';
import { Hono, Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    'Todo': {
        dataType: 'refObject',
        properties: {
            'id': {"dataType":"double"},
            'title': {"dataType":"string","required":true},
            'completed': {"dataType":"boolean","required":true},
        },
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes<T extends Hono>(router: T) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
                 
    return router
        .get('/todos', async (ctx: Context, next: any) => {
            const args = {
            };

            let validatedArgs: any;
            
            try {
              validatedArgs = await getValidatedArgs(args, ctx);
            } catch (err: any) {
              if (err instanceof ValidateError) {
                return ctx.json({ fields: err.fields }, (err.status || 400) as StatusCode);
              }

              return ctx.json({
                message: err.message,
                cause: err.cause,
              });
            }

            const controller = new ExampleController();

            const handlers = [
              ...(fetchMiddlewares<Context>(ExampleController)),
              ...(fetchMiddlewares<Context>(ExampleController.prototype.getTodos)),
              async () => {
                const result = await controller.getTodos.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
        .post('/todos', async (ctx: Context, next: any) => {
            const args = {
                    todo: {"in":"body","name":"todo","required":true,"ref":"Todo"},
            };

            let validatedArgs: any;
            
            try {
              validatedArgs = await getValidatedArgs(args, ctx);
            } catch (err: any) {
              if (err instanceof ValidateError) {
                return ctx.json({ fields: err.fields }, (err.status || 400) as StatusCode);
              }

              return ctx.json({
                message: err.message,
                cause: err.cause,
              });
            }

            const controller = new ExampleController();

            const handlers = [
              ...(fetchMiddlewares<Context>(ExampleController)),
              ...(fetchMiddlewares<Context>(ExampleController.prototype.addTodo)),
              async () => {
                const result = await controller.addTodo.apply(controller, validatedArgs)
                return returnHandler(ctx, controller, result);
              },
            ];

            return runHandlers(ctx, handlers);
        })
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

async function runHandlers(ctx: Context, handlers: any) {
  const [handler, ...next] = handlers;

  return handler(ctx, next.length ? () => runHandlers(ctx, next) : undefined);
}

function identifyObject(obj: any) {
  if (obj === null) {
    return 'null';
  } else if (obj === undefined) {
    return 'undefined';
  } else if (typeof obj === 'string') {
    return 'String';
  } else if (typeof obj === 'boolean') {
    return "Boolean";
  } else if (typeof obj === 'number') {
    return 'Number';
  } else if (obj instanceof ArrayBuffer) {
    return 'ArrayBuffer';
  } else if (obj instanceof Buffer) {
    return 'Buffer';
  } else if (typeof obj === 'object') {
    return 'Object';
  } else {
    throw new Error('Unknown type');
  }
}

function returnHandler(
  ctx: Context,
  controller: Controller,
  data?: string | object | number | boolean,
) {
  switch (identifyObject(data)) {
    case 'Number':
    case 'Boolean':
    case 'String':
      if (!data) return;
      return ctx.text(
        data.toString() as string,
        // The default status in required for hono to set the headers
        (controller.getStatus() || 200) as StatusCode,
        controller.getHeaders() as Record<string, string>,
      );    
    case 'ArrayBuffer':    
    case 'Buffer':    
      // Doesn't seem to be a built in way to handle buffers in hono
      return new Response(data as Buffer, {
        status: (controller.getStatus() || 200) as StatusCode,
        headers: controller.getHeaders() as Record<string, string>,
      });
    case 'Object':
      // The default status in required for hono to set the headers
      return ctx.json(
        data as Object,
        (controller.getStatus() || 200) as StatusCode,
        controller.getHeaders() as Record<string, string>,
      );  }
}

async function getBody(ctx: Context) {
  const contentType = ctx.req.header('content-type')?.toLowerCase() || '';

  if (contentType.startsWith('application/json')) {
    return ctx.req.json();
  }

  if (contentType.startsWith('application/x-www-form-urlencoded') || contentType.startsWith('multipart/form-data')) {
    return ctx.req.parseBody();
  }

  return ctx.req.text();
}

async function getValidatedArgs(
    args: any,
    ctx: any,    
  ) {
    const errorFields: FieldErrors = {};
    const values = await Promise.all(Object.keys(args).map(async (key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return {
            ...ctx.request,
            ctx,
          };
        case 'query':
          return validationService.ValidateParam(
            args[key],
            ctx.req.query(name),
            name,
            errorFields,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'path':
          return validationService.ValidateParam(
            args[key],
            ctx.req.param(name),
            name,
            errorFields,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'header':
          return validationService.ValidateParam(
            args[key],
            ctx.req.header(name) ?? undefined,
            name,
            errorFields,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'body':
          return validationService.ValidateParam(
            args[key],
            await getBody(ctx),
            name,
            errorFields,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'body-prop':
          return validationService.ValidateParam(
            args[key],
            ctx.body?.[name],
            name,
            errorFields,
            'body.',
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'formData':
          if (args[key].dataType === 'file') {
            return validationService.ValidateParam(
              args[key],
              ctx.files[0],
              name,
              errorFields,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          } else if (
            args[key].dataType === 'array' &&
            args[key].array.dataType === 'file'
          ) {
            return validationService.ValidateParam(
              args[key],
              ctx.files,
              name,
              errorFields,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          } else {
            return validationService.ValidateParam(
              args[key],
              ctx.body[name],
              name,
              errorFields,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          }
      }
    }));
    if (Object.keys(errorFields).length > 0) {
      throw new ValidateError(errorFields, '');
    }
    return values;
  }