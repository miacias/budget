import { Router } from 'express';
import { api } from '../../../controllers';
import { authMiddleware } from '../../../utils/auth';
import { incomeRouter } from './income/income.route';

const router: Router = Router({ mergeParams: true });

router.post('/', api.user.create);
router.get('/', authMiddleware, api.user.getAll);
router.get('/:userId', authMiddleware, api.user.getOneById);
router.delete('/:userId', authMiddleware, api.user.deleteUser);

router.use('/:userId/incomeSources', authMiddleware, incomeRouter);

export { router as userRouter };