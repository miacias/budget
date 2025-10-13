import { Router } from 'express';
import { authRouter } from './auth/index.js';
import { userRouter } from './user/index.js';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

export { router as apiRouter };