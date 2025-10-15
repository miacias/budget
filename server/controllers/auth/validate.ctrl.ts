import { logger } from '../../utils/chalk';
import { getTokenFromHeader, verifyToken } from '../../utils/auth';
import { Request, Response } from 'express';

export const validateToken = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  logger.debug('Validating token...');
  const endpoint = {
    route: '/api/auth/validate',
    method: 'GET',
  }
  try {
    const token = getTokenFromHeader(req);
    console.log(token);

    if (!token) {
      logger.info('No token provided');
      logger.server.request(endpoint.method, endpoint.route, 401);
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const decoded = verifyToken(token) as any;

    logger.success('Token is valid');
    logger.server.request(endpoint.method, endpoint.route, 200);
    return res.status(200).json({
      success: true,
      message: 'Token is valid',
      data: {
        id: decoded.id,
        email: decoded.email,
      }
    });
  } catch (err: any) {
    logger.error(`Error validating token: ${err.message}`);
    logger.server.request(endpoint.method, endpoint.route, 500);
    return res.status(500).json({
      success: false,
      message: 'Error validating token',
    });
  }
}
