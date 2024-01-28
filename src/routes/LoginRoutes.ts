import { Router } from 'express';
import { loginController } from "../controllers/LoginController";
import { invalidPasswordMiddleware } from '../middleware/InvalidPasswordMiddleware';
import { invlaidEmailMiddleware } from '../middleware/InvalidEmailMiddleware';

const loginRoutes = Router();

loginRoutes.post('/login',
    invalidPasswordMiddleware.execute,
    invlaidEmailMiddleware.execute,
    loginController.signIn
);

export { loginRoutes };