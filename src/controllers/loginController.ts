import { Request, Response, NextFunction } from 'express';
import { loginCustomerService } from '../services/LoginService';
import { customerRepository } from '../repositories/CustomerRepository';
import { encrypt } from '../helpers/CryptHelper';

class LoginController {
    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const customer = await customerRepository.getCustomerByEmail(email);

            if (!customer) {
                res.status(400).json({ error: 'Email ou Senha inválidos' });
                return next();
            }

            const passwordProvided = encrypt(password);
            if (customer.password !== passwordProvided) {
                res.status(400).json({ error: 'Email ou Senha inválidos' });
                return next();
            }

            const resposta = await loginCustomerService.signIn({ email, password });
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