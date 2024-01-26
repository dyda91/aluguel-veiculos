import { Router } from 'express';

import { loginController } from "../controllers/LoginController";

const loginRoutes = Router();

loginRoutes.post('/customers/login', loginController.signIn);

export { loginRoutes };