import { Router } from 'express';

import { passwordController } from '../controllers/PasswordController';

const passwordRoutes = Router();

passwordRoutes.post('/password/forgotPassword',
    passwordController.forgotPassword
);

export { passwordRoutes };