import { Request, Response, NextFunction } from 'express';
import { loginService } from '../services/LoginService';

class LoginController {
    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const resposta = await loginService.signIn({ email, password });
            res.json(resposta);
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