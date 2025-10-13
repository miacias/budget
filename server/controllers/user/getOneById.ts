import { Request, Response } from 'express';
import { User } from '../../models';
import { logger } from '../../utils/chalk';

export const getOneById = async (req: Request, res: Response) => {
  const userId = req?.params?.id;
  if (!userId) {
    logger.info('User ID is required');
    logger.server.request('GET', '/api/user/:id', 400);
    return res.status(400).json({ 
      success: false,
      message: 'User ID is required',
    });
  }

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      logger.info('User not found');
      logger.server.request('GET', `/api/user/${userId}`, 404);
      return res.status(404).json({ 
        success: false,
        message: 'User not found',
      });
    }

    logger.success('User retrieved successfully');
    logger.server.request('GET', `/api/user/${userId}`, 200);
    return res.status(200).json({ 
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (err: any) {
    logger.error(`Get User Error: ${err.message}`);
    return res.status(500).json({ 
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
}