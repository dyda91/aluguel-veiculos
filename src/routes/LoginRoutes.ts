import { Router } from 'express';
import { loginController } from "../controllers/LoginController";
import { customerLoginVerificationMiddleware } from '../middleware/CustomerLoginVerificationMiddleware';
import { employeeLoginVerificationMiddleware } from '../middleware/EmployeeLoginVerificationMiddleware';

const loginRoutes = Router();

loginRoutes.post('/login/customer',
    customerLoginVerificationMiddleware.execute,
    loginController.signInCustomer
);

loginRoutes.post('/login/employee',
    employeeLoginVerificationMiddleware.execute,
    loginController.signInEmployee
)

export { loginRoutes };