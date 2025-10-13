import { Request, Response } from 'express';
import { User } from '../../models';
import { logger } from '../../utils/chalk';

export const getAll = async (req: Request, res: Response) => {
  logger.debug('Fetching all users...');
  const endpoint = {
    route: '/api/users',
    method: 'GET',
  };
  try {
    const users = await User.find().select('-password -incomeSources -expenseGroups').populate('incomeSourcesCount').lean();
    if (!users) {
      logger.info('No users found');
      logger.server.request(endpoint.method, endpoint.route, 404);
      return res.status(404).json({ 
        success: false,
        message: 'No users found',
      });
    }

    logger.success('Users retrieved successfully');
    logger.server.request(endpoint.method, endpoint.route, 200);
    return res.status(200).json({ 
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (err: any) {
    logger.error(`Get All Users Error: ${err.message}`);
    logger.server.request(endpoint.method, endpoint.route, 500);
    return res.status(500).json({ 
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
}