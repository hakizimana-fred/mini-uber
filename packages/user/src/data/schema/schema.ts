export const typeDefs = `#graphql

  type Query {
    user: User
  }

  type Mutation{
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }

  type User{
    name: String!
    email: String!
    password: String!
  }
`;
