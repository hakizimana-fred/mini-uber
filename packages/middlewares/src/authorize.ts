import 'dotenv/config';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

interface AuthUser {
  id: string;
  email: string;
}

export const authMiddleware = (req: Request): AuthUser | null => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return null;

  const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
};
