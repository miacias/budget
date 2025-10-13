import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { IncomeSource, User } from "../../../models";
import { logger } from "../../../utils/chalk";

export const createIncomeSource = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  logger.debug('Creating income source...');
  const { userId } = req?.params;
  const { name, monthlyGrossPay, monthlyTaxes, hourlyWage, salary } = req.body;
  const endpoint = {
    route: `/api/users/${userId}/incomeSources`,
    method: 'POST',
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

    if (!name || !monthlyGrossPay || !monthlyTaxes) {
      logger.info('Missing required fields');
      logger.server.request(endpoint.method, endpoint.route, 400);
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const user = await IncomeSource.findOne({ name, userId: new ObjectId(userId) });
    if (user) {
      logger.info('Income source with this name already exists for the user');
      logger.server.request(endpoint.method, endpoint.route, 409);
      return res.status(409).json({
        success: false,
        message: 'Income source with this name already exists for the user',
      });
    }

    const incomeSource = await IncomeSource.create({
      name,
      monthlyGrossPay,
      monthlyTaxes,
      hourlyWage,
      salary,
      userId: new ObjectId(req.user.id),
    });

    if (!incomeSource) {
      logger.info('Failed to create income source');
      logger.server.request(endpoint.method, endpoint.route, 500);
      return res.status(500).json({
        success: false,
        message: 'Failed to create income source',
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { $push: { incomeSources: incomeSource._id } });
    if (!updatedUser) {
      logger.info('Failed to associate income source with user');
      logger.server.request(endpoint.method, endpoint.route, 500);
      return res.status(500).json({
        success: false,
        message: 'Failed to associate income source with user',
      });
    }

    logger.success(`Income source created: ${incomeSource.name}`);
    logger.server.request(endpoint.method, endpoint.route, 201);
    return res.status(201).json({
      success: true,
      message: 'Income source created successfully',
      data: incomeSource,
    });

  } catch (err) {
    logger.error(`Error creating income source - ${(err as Error).message}`);
    logger.server.request(endpoint.method, endpoint.route, 500);
    return res.status(500).json({
      success: false,
      message: 'Error creating income source',
    });
  }
}