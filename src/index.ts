import { Hono } from 'hono'

import { type RootResolver, graphqlServer } from '@hono/graphql-server'
import { buildSchema } from 'graphql'

import { RegisterRoutes } from '../build/routes'
import { swaggerUI } from '@hono/swagger-ui'
import { serveStatic } from 'hono/serve-static'
import { readFile } from 'fs/promises'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Register TSOA routes
RegisterRoutes(app as any);

// Serve Swagger UI
app.use('/swagger', swaggerUI({ url: '/swagger.json' }));

app.use(
  '/swagger.json',
  serveStatic({
    path: './build/swagger.json',
    getContent: async (path) => {
      try {
        const content = await readFile(path, 'utf-8');
        return new Response(content, { headers: { 'Content-Type': 'application/json' } });
      } catch {
        return null;
      }
    },
  })
);

// GRAPHQL
const schema = buildSchema(`
type Query {
  hello: String
}
`)

const rootResolver: RootResolver = (c) => {
  return {
    hello: () => 'Hello Hono!',
  }
}

app.use(
  '/graphql',
  graphqlServer({
    schema,
    rootResolver,
    graphiql: true, // if `true`, presents GraphiQL when the GraphQL endpoint is loaded in a browser.
  })
)

export default app
