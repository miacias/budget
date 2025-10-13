import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { IncomeSource } from "../../../models";
import { logger } from "../../../utils/chalk";

export const patchIncomeSource = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  logger.debug('Updating income source...');
  const { userId, incomeId } = req?.params;
  const { name, monthlyGrossPay, monthlyTaxes, hourlyWage, salary } = req.body;
  const endpoint = {
    route: `/api/users/${userId}/incomeSources/${incomeId}`,
    method: 'PATCH',
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

    // Builds update object with only provided fields for patch
    const updateData: Partial<{
      name: string;
      monthlyGrossPay: number;
      monthlyTaxes: number;
      hourlyWage?: number;
      salary?: number;
    }> = {};

    if (name !== undefined) updateData.name = name;
    if (monthlyGrossPay !== undefined) updateData.monthlyGrossPay = monthlyGrossPay;
    if (monthlyTaxes !== undefined) updateData.monthlyTaxes = monthlyTaxes;
    if (hourlyWage !== undefined) updateData.hourlyWage = hourlyWage;
    if (salary !== undefined) updateData.salary = salary;

    // Check if at least one field is being updated
    if (Object.keys(updateData).length === 0) {
      logger.info('Bad Request: No fields to update');
      logger.server.request(endpoint.method, endpoint.route, 400);
      return res.status(400).json({
        success: false,
        message: 'Bad Request: No fields to update',
      });
    }

    // updates specific income source for the user
    const incomeSource = await IncomeSource.findOneAndUpdate(
      { 
        _id: new ObjectId(incomeId),
        userId: new ObjectId(userId)
      },
      updateData,
      { 
        new: true, // Return updated document
        runValidators: true // Run mongoose validators
      }
    );

    if (!incomeSource) {
      logger.info('Income source not found');
      logger.server.request(endpoint.method, endpoint.route, 404);
      return res.status(404).json({
        success: false,
        message: 'Income source not found',
      });
    }

    logger.success(`Income source updated: ${incomeSource.name}`);
    logger.server.request(endpoint.method, endpoint.route, 200);
    return res.status(200).json({
      success: true,
      message: 'Income source updated successfully',
      data: incomeSource,
    });

  } catch (err) {
    logger.error(`Error updating income source - ${(err as Error).message}`);
    logger.server.request(endpoint.method, endpoint.route, 500);
    return res.status(500).json({
      success: false,
      message: 'Error updating income source',
    });
  }
}