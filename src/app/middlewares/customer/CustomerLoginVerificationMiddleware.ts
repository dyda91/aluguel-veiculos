import { Request, Response, NextFunction } from 'express';
import { customerRepository } from "../../../infra/db/sequelize/repositories/customerRepository";
import { encrypt } from '../../helpers/cryptHelper';
import { AppError } from '../../errors/AppError';

class CustomerLoginVerificationMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const customer = await customerRepository.findByEmail(email);
            const passwordProvided = encrypt(password);

            if (!customer) {
                res.status(400).json({ error: 'Email ou Senha inválidos' });
            }

            else if (customer.password != passwordProvided) {
                res.status(400).json({ error: 'Email ou Senha inválidos' });
            }

            else {
                next();
            }
        } catch (error) {
            console.error(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const customerLoginVerificationMiddleware = new CustomerLoginVerificationMiddleware();

export { customerLoginVerificationMiddleware }