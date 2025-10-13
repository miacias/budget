import { Router } from 'express';
import { api } from '../../../controllers';
import { authMiddleware } from '../../../utils/auth';

const router: Router = Router();

router.post('/login', api.auth.loginUser);
router.post('/logout', authMiddleware, api.auth.logoutUser);

export { router as authRouter };