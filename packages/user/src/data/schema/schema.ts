export const typeDefs = `#graphql

  type Query {
    user: User
  }

  type Mutation{
    user: User
  }

  type User{
    name: String!
    email: String!
    password: String!
  }
`;
