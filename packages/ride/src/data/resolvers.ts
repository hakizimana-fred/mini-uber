type Ride = {
  rider: string;
  driver: string;
  status: string;
};

export const resolvers = {
  Mutation: {
    createRide: async (
      _: any,
      { input: { rider, driver, status } }: { input: Ride }
    ) => {
      console.log(rider, driver, status);
    },
  },
};
