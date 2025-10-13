import { Request, Response } from 'express';
import { IncomeSource } from '../../../models';
import { logger } from '../../../utils/chalk';

export const deleteIncomeSource = async (req: Request, res: Response) => {
  logger.debug('Deleting (archiving) income source...');
  const { userId, incomeId } = req?.params;
  const endpoint = {
    route: `/api/users/${userId}/incomeSources/${incomeId}`,
    method: 'DELETE',
  };
  try {
    if (!userId) {
      logger.info('Unauthorized: No user in request');
      logger.server.request(endpoint.method, endpoint.route, 401);
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    if (!req.user) {
      logger.info('Unauthorized: No user in token');
      logger.server.request(endpoint.method, endpoint.route, 401);
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    if (req.user.id !== userId) {
      logger.info('Forbidden: User ID does not match token');
      logger.server.request(endpoint.method, endpoint.route, 403);
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }

    if (!incomeId) {
      logger.info('Bad Request: No income ID provided');
      logger.server.request(endpoint.method, endpoint.route, 400);
      return res.status(400).json({
        success: false,
        message: 'Bad Request: No income ID provided',
      });
    }

    const incomeSource = await IncomeSource.findOne({ _id: incomeId, userId });
    if (!incomeSource) {
      logger.info('Income source not found');
      logger.server.request(endpoint.method, endpoint.route, 404);
      return res.status(404).json({
        success: false,
        message: 'Income source not found',
      });
    }

    // Soft delete by setting archived to true
    incomeSource.archived = true;
    await incomeSource.save();
    logger.info('Income source archived successfully');
    logger.server.request(endpoint.method, endpoint.route, 200);
    return res.status(200).json({
      success: true,
      message: 'Income source archived successfully',
    });
  } catch (err) {
    logger.error(`Delete Income Source Error: ${(err as Error).message}`);
    logger.server.request(endpoint.method, endpoint.route, 500);
    return res.status(500).json({
      success: false,
      message: 'Error deleting income source',
    });
  }
}