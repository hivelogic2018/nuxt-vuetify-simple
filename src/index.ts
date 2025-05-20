import { Hono } from 'hono'

import { RegisterRoutes } from '~/build/routes'
import { swaggerUI } from '@hono/swagger-ui'
import { serveStatic } from 'hono/serve-static'
import { readFile } from 'fs/promises'

import { graphqlServer } from '@hono/graphql-server'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { helloTypeDefs, helloResolvers } from '@/graphql/hello/helloSchema'
import { userTypeDefs } from '@/graphql/user/userSchema'
import { userResolvers } from '@/graphql/user/userResolver'

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
// Combine typeDefs and resolvers
const typeDefs = mergeTypeDefs([helloTypeDefs, userTypeDefs]);
const resolvers = mergeResolvers([helloResolvers, userResolvers]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create a GraphQL server
app.use(
  '/graphql',
  graphqlServer({
    schema,
    graphiql: true, // if `true`, presents GraphiQL when the GraphQL endpoint is loaded in a browser.
  })
)

// Serve .gql files as static assets for examples
app.use(
  '/gql/*',
  serveStatic({
    root: './src',
    getContent: async (path) => {
      try {
        const content = await readFile(path, 'utf-8');
        return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
      } catch {
        return null;
      }
    },
  })
);


export default app
