export const typeDefs = `#graphql
  
  type Query {
    hello: String
  }

  input PickupLocationInput {
    latitude: Float!
    longitude: Float!

  }

  input DestinationLocationInput {
    latitude: Float!
    longitude: Float!
  }

  input RideInput {
    status: String!
    pickupLocation: PickupLocationInput
    destinationLocation: DestinationLocationInput
  }

  type Mutation {
    createRide(input: RideInput!): Boolean
  }

  type Ride {
        rider: String!
        driver: String
        status: String
  }

  
  # type DestinationLocation{
  #   type: String!
  #   coordinates: [Float!]!
  #   address: String!
  # }

`;
