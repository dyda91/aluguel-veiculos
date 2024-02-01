import { Router } from 'express';
import { passwordController } from '../controllers/PasswordController';
import { passwordAuthMiddleware } from '../middleware/PasswordAuthMiddleware';
import { employeeForgottenPasswordRequestMiddleware } from '../middleware/EmployeeForgottenPasswordRequestMiddleware';
import { customerForgottenPasswordRequestMiddleware } from '../middleware/CustomerForgottenPasswordRequestMiddleware';
import { customerTokenVerificationMiddleware } from '../middleware/CustomerTokenVerificationMiddleware';
import { employeeTokenVerificationMiddleware } from '../middleware/EmployeeTokenVerificationMiddleware';
import { compareCustomerPasswordsMiddleware } from '../middleware/CompareCustomerPasswordsMiddleware';
import { compareEmployeePasswordsMiddleware } from '../middleware/CompareEmployeePasswordsMiddleware';

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