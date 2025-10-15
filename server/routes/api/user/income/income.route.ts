import { Router } from 'express';
import { api } from '../../../../controllers';
import { authMiddleware } from '../../../../utils/auth';

const router: Router = Router({ mergeParams: true });

router.post('/', authMiddleware, api.user.income.createIncomeSource);
router.patch('/:incomeId', authMiddleware, api.user.income.patchIncomeSource);
router.delete('/:incomeId', authMiddleware, api.user.income.deleteIncomeSource);

export { router as incomeRouter };