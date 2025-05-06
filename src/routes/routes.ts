/* tslint:disable */
/* eslint-disable */
import { Hono } from 'hono';
import { ExampleController } from '../controllers/ExampleController';

export function RegisterRoutes(app: Hono): void {
  const exampleController = new ExampleController();

  // GET /todos
  app.get('/todos', async (c) => {
    try {
      const result = await exampleController.getTodos();
      return c.json(result);
    } catch (err) {
      return c.json({ error: (err as Error).message }, 500);
    }
  });

  // POST /todos
  app.post('/todos', async (c) => {
    try {
      const body = await c.req.json();
      const result = await exampleController.addTodo(body);
      return c.json(result);
    } catch (err) {
      return c.json({ error: (err as Error).message }, 500);
    }
  });
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
