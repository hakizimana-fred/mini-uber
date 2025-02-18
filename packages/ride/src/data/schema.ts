export const typeDefs = `#graphql
 

  input RideInput {
    rider: String!
    driver: String
    status: String
  }

  type Mutation {
    createRide(input: RideInput!): Ride
  }

  type Ride {
        rider: String!
        driver: String
        status: String
  }

`;
