import { ApolloError } from 'apollo-server-core';
import argon2 from 'argon2';
import User from '../../../models/User.model';
import { generateAccessToken } from '../../utils/generateAccessToken';

type User = {
  name: string;
  email: string;
  password: string;
  accessToken?: string;
};

type SafeUser = Omit<User, 'password'>;

export const resolvers = {
  Query: {
    user: (): User => ({
      name: 'fred',
      email: 'hakifred@gmail.com',
      password: '12345',
    }),
  },

  Mutation: {
    register: async (
      _: any,
      { name, email, password }: User
    ): Promise<SafeUser> => {
      try {
        // find user by email
        const user = await User.findOne({ email });
        if (user) {
          throw new ApolloError('User already exists');
        }
        const hashedPassword = await argon2.hash(password);
        // create new user
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
        });

        await newUser.save();
        const savedUser = {
          name: newUser.name,
          email: newUser.email,
        };
        generateAccessToken(savedUser);
        return savedUser;
      } catch (err) {
        throw err;
      }
    },
  },
};
