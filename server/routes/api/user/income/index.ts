import { Router } from 'express';
import { api } from '../../../../controllers';

const router: Router = Router();

router.post('/', api.user.income.createIncomeSource);

export { router as incomeRouter };