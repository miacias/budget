import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../chalk';

interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

// extends Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}

const secret: Secret = process.env.JWT_SECRET as Secret;
const expiration = process.env.JWT_EXPIRATION || '2h' as string;


if (!secret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const signToken = (payload: object): string => {
  console.log('🔐 Signing token with payload:', payload);
  const token = jwt.sign(payload, secret, { expiresIn: expiration } as SignOptions);
  logger.success('Token generated successfully');
  return token;
}

export const verifyToken = (token: string): string | JwtPayload => {
  logger.info('🔍 Verifying token...');
  try {
    const decoded = jwt.verify(token, secret) as CustomJwtPayload;
    logger.success('Token is valid');
    return decoded;
  } catch (err) {
    logger.error(`Invalid or expired token. Error: ${(err as Error).message}`);
    throw new Error('Invalid or expired token');
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ 
      success: false,
      message: 'No token provided',
    });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }
  try {
    const decoded = verifyToken(token) as CustomJwtPayload;
    logger.success('User authenticated');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false,
      message: 'Invalid or expired token',
    });
  }
}

export const getTokenFromHeader = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    return token || null;
  }
  return null;
}