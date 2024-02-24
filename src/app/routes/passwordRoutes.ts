import { Router } from 'express';
import { passwordController } from '../controllers/PasswordController';
import { customerForgottenPasswordRequestMiddleware } from '../middlewares/customer/CustomerForgottenPasswordRequestMiddleware';
import { employeeForgottenPasswordRequestMiddleware } from '../middlewares/employee/EmployeeForgottenPasswordRequestMiddleware';
import { passwordAuthMiddleware } from '../middlewares/PasswordAuthMiddleware';
import { customerTokenVerificationMiddleware } from '../middlewares/customer/CustomerTokenVerificationMiddleware';
import { compareCustomerPasswordsMiddleware } from '../middlewares/customer/CompareCustomerPasswordsMiddleware';
import { employeeTokenVerificationMiddleware } from '../middlewares/employee/EmployeeTokenVerificationMiddleware';
import { compareEmployeePasswordsMiddleware } from '../middlewares/employee/CompareEmployeePasswordsMiddleware';

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