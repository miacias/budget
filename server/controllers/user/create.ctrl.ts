import { ObjectId } from 'mongodb';
import { User } from '../../models';
import { logger } from '../../utils/chalk';
import { signToken } from '../../utils/auth';
import { Request, Response } from 'express';

export const create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  logger.debug('Creating user...');
  const { firstName, lastName, email, password } = req.body;
  const endpoint = {
    route: '/api/users',
    method: 'POST',
  };
  try {
    if (!firstName || !lastName || !email || !password) {
      logger.info('Missing required fields');
      logger.server.request(endpoint.method, endpoint.route, 400);
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields',
      });
    }

    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      logger.info('User already exists');
      logger.server.request(endpoint.method, endpoint.route, 409);
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    const user = await User.create(req.body);
    if (!user) {
      logger.info('Failed to create user');
      logger.server.request(endpoint.method, endpoint.route, 500);
      return res.status(500).json({ 
        success: false,
        message: 'Failed to create user',
      });
    }

    logger.success(`User registered: ${user.email}`);
    
    const token = signToken({ id: user._id as unknown as ObjectId, email: user.email });
    const signedInUser = await User.findByIdAndUpdate(user._id, { token }, { new: true });
    if (!signedInUser) {
      logger.info('Failed to sign in user after registration');
      logger.server.request(endpoint.method, endpoint.route, 500);
      return res.status(500).json({ 
        success: false,
        message: 'Failed to sign in user after registration',
      });
    }

    logger.server.request('POST', '/api/user', 201);
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err: any) {
    logger.error(`Register Error: ${err.message}`);
    logger.server.request(endpoint.method, endpoint.route, 500);
    return res.status(500).json({ 
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
}