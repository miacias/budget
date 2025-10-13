import { Router } from 'express';
import { api } from '../../../controllers';
import { incomeRouter } from './income';

const router: Router = Router();

router.post('/', api.user.create);
router.get('/', api.user.getAll);
router.get('/:id', api.user.getOneById);
router.delete('/:id', api.user.deleteUser);

router.use('/:id/income', incomeRouter);

export { router as userRouter };