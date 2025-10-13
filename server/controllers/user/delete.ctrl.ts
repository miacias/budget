import { User } from '../../models';
import { Request, Response } from 'express';
import { logger } from '../../utils/chalk';

export const deleteUser = async (req: Request, res: Response) => {
  logger.debug('Deleting user...');
  const userId = req?.params?.id;
  if (!userId) {
    logger.server.request('DELETE', '/api/user/:id', 400);
    return res.status(400).json({ 
      success: false,
      message: 'User ID is required',
    });
  }

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      logger.info('User not found');
      logger.server.request('DELETE', `/api/user/${userId}`, 404);
      return res.status(404).json({ 
        success: false,
        message: 'User not found',
      });
    }

    logger.success('User deleted successfully');
    logger.server.request('DELETE', `/api/user/${userId}`, 200);
    return res.status(200).json({ 
      success: true,
      message: 'User deleted successfully',
      data: user,
    });
  } catch (err: any) {
    logger.error(`Delete User Error: ${err.message}`);
    return res.status(500).json({ 
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
}