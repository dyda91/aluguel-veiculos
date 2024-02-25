import { Request, Response, NextFunction } from 'express';
import { loginSignInCustomerService } from '../services/LoginService/LoginSignInCustomerService';
import { loginSignInEmployeeService } from '../services/LoginService/LoginSignInEmployeeService';

class LoginController {
    async signInCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = await loginSignInCustomerService.signInCustomer({ email, password });
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            res.send(token);
            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }

    async signInEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = await loginSignInEmployeeService.signInEmployee({ email, password });
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            res.send(token);
            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const loginController = new LoginController();

export { loginController };