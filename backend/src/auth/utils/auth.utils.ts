import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

interface TokenPayload {
  userId: number;
}

export function generateToken(userId: number, rememberMe: boolean): string {
 

  const expiresIn = rememberMe ? '30d' : '3d';
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn });



  return token;
}


export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
}