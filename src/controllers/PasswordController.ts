import { Request, Response, NextFunction } from 'express';
import { passwordService } from '../services/PasswordService';

class PasswordController {
    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, cpf } = req.body;
            const reply = await passwordService.forgotPassword({email, cpf});
            res.json(reply);
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }

    }
}

const passwordController = new PasswordController();

export { passwordController }