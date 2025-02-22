export const typeDefs = `#graphql
type Query {
    hello: String
  }
  
  type Mutation {
    processPayment(input: PaymentInput!): PaymentResponse!
  }

  input PaymentInput {
    amount: Float!
    currency: String!
    paymentMethodId: String!
  }

  type PaymentResponse {
    success: Boolean!
    message: String
    transactionId: String
  }
`;
