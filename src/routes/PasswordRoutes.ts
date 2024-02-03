import { Router } from 'express';
import { passwordController } from '../controllers/PasswordController';
import { passwordAuthMiddleware } from '../middlewares/PasswordAuthMiddleware';
import { employeeForgottenPasswordRequestMiddleware } from '../middlewares/EmployeeForgottenPasswordRequestMiddleware';
import { customerForgottenPasswordRequestMiddleware } from '../middlewares/CustomerForgottenPasswordRequestMiddleware';
import { customerTokenVerificationMiddleware } from '../middlewares/CustomerTokenVerificationMiddleware';
import { employeeTokenVerificationMiddleware } from '../middlewares/EmployeeTokenVerificationMiddleware';
import { compareCustomerPasswordsMiddleware } from '../middlewares/CompareCustomerPasswordsMiddleware';
import { compareEmployeePasswordsMiddleware } from '../middlewares/CompareEmployeePasswordsMiddleware';

const passwordRoutes = Router();

//Post
passwordRoutes.post('/password/customer/forgot',
    customerForgottenPasswordRequestMiddleware.check,
    passwordController.forgotCustomerPassword
);

passwordRoutes.post('/password/employee/forgot',
    employeeForgottenPasswordRequestMiddleware.check,
    passwordController.forgotEmployeePassword
);

//Put
passwordRoutes.put('/password/customer/change/:id',
    passwordAuthMiddleware.execute,
    customerTokenVerificationMiddleware.execute,
    compareCustomerPasswordsMiddleware.compare,
    passwordController.changeCustomerPassword
);

passwordRoutes.put('/password/employee/change/:id',
    passwordAuthMiddleware.execute,
    employeeTokenVerificationMiddleware.execute,
    compareEmployeePasswordsMiddleware.compare,
    passwordController.changeEmployeePassword
);

export { passwordRoutes };