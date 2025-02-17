export const typeDefs = `#graphql

type Query {
    user: User
}

input LocationInput {
  latitude: Float!
  longitude: Float!
}

input RegisterInput {
  name: String!
  email: String!
  password: String!
  role: String
  vehicleInfo: VehicleInput
  isAvailable: Boolean
  currentLocation: LocationInput
}

input LoginInput {
  email: String!
  password: String!
}

input VehicleInput {
  model: String
  year: Int
  plateNumber: String
  color: String
}


  type Mutation{
    register(input: RegisterInput): User
    login(input: LoginInput): User
  }

  type User{
    name: String!
    email: String!
    password: String!
    accessToken: String
    role: String
     vehicleInfo: Vehicle
    isAvailable: Boolean
    currentLocation: Location
  }

  type Vehicle{
    model: String
    year: Int
    plateNumber: String
    color: String
  }

  type Location{
    type: String!
    coordinates: [Float!]!
  }
`;
