import { ApolloError } from 'apollo-server-core';
import argon2 from 'argon2';
import User from '../../../models/User.model';
import { generateAccessToken } from '../../utils/generateAccessToken';
import {
  validateLoginInput,
  validateUserInput,
} from '../../utils/sanitizeInputs';

type User = {
  name: string;
  email: string;
  password: string;
  accessToken?: string;
  role?: 'user' | 'rider';
};

type SafeUser = Omit<User, 'password'>;

export const resolvers = {
  Mutation: {
    register: async (
      _: any,
      { name, email, password, role }: User
    ): Promise<SafeUser> => {
      try {
        validateUserInput(name, email, password);
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
          role: role || 'user',
        });

        await newUser.save();
        const savedUser = {
          name: newUser.name,
          email: newUser.email,
          accessToken: generateAccessToken(newUser),
          role: newUser.role as unknown as 'user' | 'rider',
        };
        console.log(savedUser, 'savedUser');
        return savedUser;
      } catch (err) {
        throw err;
      }
    },

    login: async (_: any, { email, password }: User): Promise<SafeUser> => {
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
