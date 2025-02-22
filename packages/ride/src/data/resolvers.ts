import 'dotenv/config';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { rideRequestProducer } from '../../../amqlib/src/rideProducer';
import Ride from '../models/Ride.model';

type IRideInput = {
  userId: string;
  status: 'requested' | 'accepted' | 'started' | 'completed' | 'cancelled';
  pickupLocation: PickupLocation;
  destinationLocation: DestinationLocation;
};

type Location = {
  type: string;
  coordinates: [number, number];
};

type PickupLocation = {
  type: string;
  latitude: number;
  longitude: number;
  address: string;
};

type DestinationLocation = {
  type: string;
  latitude: number;
  longitude: number;
  address: string;
};

export const resolvers = {
  Query: {
    hello: () => 'world',
  },
  Mutation: {
    createRide: async (
      _: any,
      { input }: { input: IRideInput },
      { req }: { req: Request } // Context contains req
    ): Promise<Boolean> => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new Error('Unauthorized');

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET as string
        ) as any;
        const user = decoded.id;

        const geoLocationPickup: Location = {
          type: 'Point',
          coordinates: [
            input.pickupLocation.longitude,
            input.pickupLocation.latitude,
          ],
        };

        const geoLocationDestination: Location = {
          type: 'Point',
          coordinates: [
            input.destinationLocation.longitude,
            input.destinationLocation.latitude,
          ],
        };

        const newRide = new Ride({
          ...input,
          userId: user,
          status: 'requested',
          requestedAt: new Date(),
          pickup: {
            ...geoLocationPickup,
            address: input.pickupLocation.address,
          },
          destination: {
            ...geoLocationDestination,
            address: input.destinationLocation.address,
          },
        });
        await newRide.save();
        // publish to rabbitmq
        await rideRequestProducer.publishRideRequest({
          rideId: newRide._id as any,
          pickup: newRide.pickup,
          userId: newRide.userId as any,
        } as any);

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
