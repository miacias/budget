import { Request, Response } from 'express';
import { User } from '../../models';
import { logger } from '../../utils/chalk';

export const getAll = async (req: Request, res: Response) => {
  logger.debug('Fetching all users...');
  try {
    const users = await User.find().select('-password');
    if (!users) {
      logger.info('No users found');
      logger.server.request('GET', '/api/user', 404);
      return res.status(404).json({ 
        success: false,
        message: 'No users found',
      });
    }

    logger.success('Users retrieved successfully');
    logger.server.request('GET', '/api/user', 200);
    return res.status(200).json({ 
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (err: any) {
    logger.error(`Get All Users Error: ${err.message}`);
    return res.status(500).json({ 
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
}