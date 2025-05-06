import { Hono } from 'hono';
import { ExampleController } from './../controllers/ExampleController';

export function RegisterRoutes(app: Hono): void {
    const exampleController = new ExampleController();

    app.get('/todos', async (c) => {
    try {
            const result = await exampleController.getTodos();
      return c.json(result);
    } catch (err) {
      return c.json({ error: (err as Error).message }, 500);
    }
  });
    app.post('/todos', async (c) => {
    try {
            const args = {
                body: await c.req.json(),
              };
            const result = await exampleController.addTodo(args);
      return c.json(result);
    } catch (err) {
      return c.json({ error: (err as Error).message }, 500);
    }
  });
    }
