import { IResolvers } from '@graphql-tools/utils';

type User = {
  id: string;
  name: string;
  email: string;
};

let users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@email.com' },
  { id: '2', name: 'Bob', email: 'bob@email.com' },
];

export const userResolvers: IResolvers = {
  Query: {
    users: () => users,
    user: (_: any, { id }: { id: string }) => users.find(u => u.id === id),
  },
  Mutation: {
    addUser: (_: any, { name, email }: { name: string; email: string }) => {
      const newUser = { id: (users.length + 1).toString(), name, email };
      users.push(newUser);
      return newUser;
    },
    updateUser: (_: any, { id, name, email }: { id: string; name?: string; email?: string }) => {
      const user = users.find(u => u.id === id);
      if (!user) return null;
      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;
      return user;
    },
    deleteUser: (_: any, { id }: { id: string }) => {
      const idx = users.findIndex(u => u.id === id);
      if (idx === -1) return false;
      users.splice(idx, 1);
      return true;
    },
  },
};