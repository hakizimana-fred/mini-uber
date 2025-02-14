type User = {
  name: string;
  email: string;
  password: string;
};

export const resolvers = {
  Query: {
    user: (): User => ({
      name: 'fred',
      email: 'hakifred@gmail.com',
      password: '12345',
    }),
  },

  Mutation: {
    user: (_: any, { name, email, password }: User): User => {
      return {
        name: name,
        email: email,
        password: password,
      };
    },
  },
};
