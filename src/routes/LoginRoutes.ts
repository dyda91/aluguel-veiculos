import { Router } from 'express';

import { loginController } from "../controllers/LoginController";

const loginRoutes = Router();

loginRoutes.post('/login', loginController.signIn);

export { loginRoutes };