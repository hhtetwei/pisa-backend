import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../../users/user.entity";

declare module 'express' {
  interface Request {
    user?: User
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
 
    const secret = process.env.JWT_SECRET;
    if (!secret) {
    
      return res.status(500).json({ message: 'Internal server error' });
    }

    try {
      const decoded = jwt.verify(token, secret) as { userId: number };
      const user = await User.findOne({ where: { id: decoded.userId } });

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      req.user = user;
      next();
    } catch (err) {
      console.error('[Auth] Invalid token:', err);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } catch (err) {
    next(err);
  }
}
