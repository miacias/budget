import { Request, Response } from 'express';
import { User } from '../../models';
import { logger } from '../../utils/chalk';

export const getOneById = async (req: Request, res: Response) => {
  const userId = req?.params?.userId;
  const includeArchived = req?.query?.includeArchived === 'true';
  const endpoint = {
    route: `/api/users/${userId}`,
    method: 'GET',
  }
  if (!userId) {
    logger.info('User ID is required');
    logger.server.request(endpoint.method, endpoint.route, 400);
    return res.status(400).json({ 
      success: false,
      message: 'User ID is required',
    });
  }

  try {
    const populateOptions = {
      path: 'incomeSources',
      match: includeArchived ? {} : { archived: { $ne: true } } // filter out archived unless includeArchived is true
    };
    const user = await User
      .findById(userId)
      .select('-password')
      .populate(populateOptions)
      .lean();
    if (!user) {
      logger.info('User not found');
      logger.server.request(endpoint.method, endpoint.route, 404);
      return res.status(404).json({ 
        success: false,
        message: 'User not found',
      });
    }

    logger.success('User retrieved successfully');
    logger.server.request(endpoint.method, endpoint.route, 200);
    return res.status(200).json({ 
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (err: any) {
    logger.error(`Get User Error: ${err.message}`);
    logger.server.request(endpoint.method, endpoint.route, 500);
    return res.status(500).json({ 
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
}