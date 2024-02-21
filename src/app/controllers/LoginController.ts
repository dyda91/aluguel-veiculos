import { Request, Response, NextFunction } from 'express';
import { loginService } from '../services/LoginService';

class LoginController {
    async signInCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const resposta = await loginService.signInCustomer({ email, password });
            res.send(resposta);
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
            const resposta = await loginService.signInEmployee({ email, password });
            res.send(resposta);
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