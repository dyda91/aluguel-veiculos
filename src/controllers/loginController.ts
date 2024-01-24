import { Request, Response, NextFunction } from 'express';
import { loginCustomerService } from '../services/LoginService';

class LoginController {
    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const resposta = await loginCustomerService.signIn({ email, password });
            res.send(resposta);
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const loginController = new LoginController();

export { loginController };