import { IResolvers } from '@graphql-tools/utils';

export const helloTypeDefs = `
  type Query {
    hello: String
  }
`;

export const helloResolvers: IResolvers = {
  Query: {
    hello: () => 'Hello Hono!',
  },
};