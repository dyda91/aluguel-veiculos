import { Router } from 'express';
import { passwordController } from '../controllers/PasswordController';
import { invlaidEmailMiddleware } from '../middleware/InvalidEmailMiddleware';
import { invalidCPF_Middleware } from '../middleware/InvalidCPF_Middleware';

const passwordRoutes = Router();

passwordRoutes.post('/password/forgotPassword',
    invlaidEmailMiddleware.execute,
    invalidCPF_Middleware.execute,
    passwordController.forgotPassword
);

export { passwordRoutes };