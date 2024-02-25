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
    customerLoginVerificationMiddleware.execute, (req: Request, res: Response) => {
        loginController.signInCustomer;
        res.redirect('/rentals/reserve');
    }
);

loginRoutes.post('/login/employee',
    employeeLoginVerificationMiddleware.execute, (req: Request, res: Response) => {
        loginController.signInEmployee
        res.redirect('/rentals/start');

    }
);

export { loginRoutes };