import { Router } from 'express';
import { apiRouter } from './api/index';
import { logger } from '../utils/chalk';

const router: Router = Router();

router.use('/api', apiRouter);

router.use((req, res) => {
  logger.server.request(req.method, req.originalUrl, 404);
  return res.status(404).json({ 
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

export { router };