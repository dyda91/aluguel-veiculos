import { Router, Request, Response } from 'express';
import { loginController } from "../controllers/LoginController";
import { customerLoginVerificationMiddleware } from '../middlewares/customer/CustomerLoginVerificationMiddleware';
import { employeeLoginVerificationMiddleware } from '../middlewares/employee/EmployeeLoginVerificationMiddleware';
import path from 'path';

const loginRoutes = Router();

//Get 
loginRoutes.get('/login/customer', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'loginCustomer.ejs');
    res.render(caminho);
});

loginRoutes.get('/login/employee', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'loginEmployee.ejs');
    res.render(caminho);
});

//Post
loginRoutes.post('/login/customer',
    customerLoginVerificationMiddleware.execute,
    loginController.signInCustomer
);

loginRoutes.post('/login/employee',
    employeeLoginVerificationMiddleware.execute,
    loginController.signInEmployee
)

export { loginRoutes };