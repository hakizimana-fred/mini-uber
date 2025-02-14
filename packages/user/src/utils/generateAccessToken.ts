import jwt from 'jsonwebtoken';

export function generateAccessToken(user: any) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '15m' }
  );
}
