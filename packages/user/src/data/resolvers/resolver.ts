import {
  generateAccessToken,
  validateLoginInput,
  validateUserInput,
} from '@myuber/utils';
import { ApolloError } from 'apollo-server-core';
import argon2 from 'argon2';
import User from '../../../models/User.model';

type User = {
  name: string;
  email: string;
  password: string;
  accessToken?: string;
  role?: 'user' | 'rider';
  vehicleInfo?: Vehicle;
  isAvailable?: boolean;
  currentLocation?: LocationInput;
};

type Location = {
  type: string;
  coordinates: [number, number];
};

type LocationInput = {
  latitude: number;
  longitude: number;
};

type Vehicle = {
  model: string;
  year: number;
  plateNumber: string;
  color: string;
};

type SafeUser = Omit<User, 'password'>;

export const resolvers = {
  Mutation: {
    register: async (
      _: any,
      {
        input: {
          name,
          email,
          password,
          role,
          vehicleInfo,
          isAvailable,
          currentLocation,
        },
      }: { input: User }
    ): Promise<SafeUser> => {
      try {
        validateUserInput(name, email, password);

        //find user by email
        const user = await User.findOne({ email });
        if (user) {
          throw new ApolloError('User already exists');
        }
        const hashedPassword = await argon2.hash(password);

        const geoLocation: Location = {
          type: 'Point',
          coordinates: [
            currentLocation?.latitude as number,
            currentLocation?.longitude as number,
          ], // Longitude comes first!
        };
        //create new user
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          role: role || 'user',
          isAvailable: isAvailable || false,
          vehicleInfo,
          currentLocation: geoLocation,
        });

        await newUser.save();
        const savedUser = {
          name: newUser.name,
          email: newUser.email,
          accessToken: generateAccessToken(newUser),
          role: newUser.role as unknown as 'user' | 'rider',
          isAvailable: newUser.isAvailable,
          vehicleInfo: newUser.vehicleInfo,
          currentLocation: newUser.currentLocation as unknown as any,
        };
        return savedUser;
        //return { name: 'haki', email: 'fred@gmail.com' };
      } catch (err) {
        throw err;
      }
    },

    login: async (
      _: any,
      { input: { email, password } }: { input: User }
    ): Promise<SafeUser> => {
      try {
        validateLoginInput(email, password);
        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new ApolloError('User does not exist');
        }
        if (!(await argon2.verify(user.password, password))) {
          throw new ApolloError('Invalid credentials');
        }
        console.log('loggin user', user._id);
        generateAccessToken(user);

        const savedUser = {
          name: user.name,
          email: user.email,
          accessToken: generateAccessToken(user),
          role: user.role as unknown as 'user' | 'rider',
        };
        return savedUser;
      } catch (err) {
        throw err;
      }
    },
  },
};
