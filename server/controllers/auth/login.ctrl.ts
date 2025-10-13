import { User } from '../../models';
import { logger } from '../../utils/chalk';
import { signToken } from '../../utils/auth';
import { Request, Response } from 'express';

export const loginUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  logger.debug('Logging in user...');
  const endpoint = {
    route: '/api/auth/login',
    method: 'POST',
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      logger.info('Missing required fields');
      logger.server.request(endpoint.method, endpoint.route, 400);
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      logger.info('Failed to find user');
      logger.server.request(endpoint.method, endpoint.route, 404);
      return res.status(500).json({ 
        success: false,
        message: 'Failed to find user',
      });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      logger.info('Invalid credentials');
      logger.server.request(endpoint.method, endpoint.route, 401);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    
    const token = signToken({ 
      id: user._id.toString(), 
      email: user.email 
    });
    
    logger.server.request(endpoint.method, endpoint.route, 200);
    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      token,
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err: any) {
    logger.error(`Login Error: ${err.message}`);
    logger.server.request(endpoint.method, endpoint.route, 500);
    return res.status(500).json({ 
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
}