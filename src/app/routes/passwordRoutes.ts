import { Router, Request, Response } from 'express';
import { passwordController } from '../controllers/PasswordController';
import { customerForgottenPasswordRequestMiddleware } from '../middlewares/customer/CustomerForgottenPasswordRequestMiddleware';
import { employeeForgottenPasswordRequestMiddleware } from '../middlewares/employee/EmployeeForgottenPasswordRequestMiddleware';
import { passwordAuthMiddleware } from '../middlewares/PasswordAuthMiddleware';
import { customerTokenVerificationMiddleware } from '../middlewares/customer/CustomerTokenVerificationMiddleware';
import { compareCustomerPasswordsMiddleware } from '../middlewares/customer/CompareCustomerPasswordsMiddleware';
import { employeeTokenVerificationMiddleware } from '../middlewares/employee/EmployeeTokenVerificationMiddleware';
import { compareEmployeePasswordsMiddleware } from '../middlewares/employee/CompareEmployeePasswordsMiddleware';
import { validateCustomerParamsIdMiddleware } from '../middlewares/customer/ValidateCustomerParamsIdMiddleware';
import path from 'path';

const passwordRoutes = Router();

//Get
passwordRoutes.get('/password/customer/forgot', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'passwordForgotCustomer.ejs');
    res.render(caminho);
});

passwordRoutes.get('/password/employee/forgot', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'passwordForgotEmployee.ejs');
    res.render(caminho);
});

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
    validateCustomerParamsIdMiddleware.validate,
    customerTokenVerificationMiddleware.execute,
    compareCustomerPasswordsMiddleware.compare,
    passwordController.changeCustomerPassword
);

passwordRoutes.put('/password/employee/change/:id',
    passwordAuthMiddleware.execute,
    validateCustomerParamsIdMiddleware.validate,
    employeeTokenVerificationMiddleware.execute,
    compareEmployeePasswordsMiddleware.compare,
    passwordController.changeEmployeePassword
);

export { passwordRoutes };