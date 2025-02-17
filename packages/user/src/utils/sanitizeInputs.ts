import { ApolloError } from 'apollo-server-core';
import { isValidEmail } from './emailValid';

export function validateUserInput(
  name: string | undefined,
  email: string,
  password: string
): void {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new ApolloError(
      'Name is required and must be a non-empty string.',
      'INVALID_USER_INPUT'
    );
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    throw new ApolloError('Valid email is required.', 'INVALID_USER_INPUT');
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    throw new ApolloError(
      'Password is required and must be at least 8 characters.',
      'INVALID_USER_INPUT'
    );
  }
}

export function validateLoginInput(email: string, password: string): void {
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    throw new ApolloError('Valid email is required.', 'INVALID_USER_INPUT');
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    throw new ApolloError(
      'Password is required and must be at least 8 characters.',
      'INVALID_USER_INPUT'
    );
  }
}
