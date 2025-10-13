import { User } from '../../models';
import { logger } from '../../utils/chalk';
import { getTokenFromHeader } from '../../utils/auth';
import { Request, Response } from 'express';

export const logoutUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  logger.debug('Logging out user...');
  try {
    const user = req.user as any;
    if (!user) {
      logger.info('No user in request');
      return res.status(401).json({ 
        success: false,
        message: 'No token provided',
      });
    }

    const token = getTokenFromHeader(req);
    
    if (!token) {
      logger.info('No token provided');
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const userId = user.id || user._id;
    const loggedOutUser = await User.findByIdAndUpdate(userId, { token: null });
    if (!loggedOutUser) {
      logger.info(`User not found: ${userId}`);
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    logger.server.request('POST', '/api/auth/logout', 200);
    return res.status(200).json({
      success: true,
      message: 'User logged out successfully',
      data: {
        token: null,
      }
    });
  } catch (err: any) {
    logger.error(`Logout Error: ${err.message}`);
    return res.status(500).json({ 
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
}