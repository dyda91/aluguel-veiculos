import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../../../infra/db/sequelize/repositories/customerRepository';
import { AppError } from '../../errors/AppError';

class ValidateCustomerEmailMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const customer = await customerRepository.findByEmail(email);

            if (customer) {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateCustomerEmailMiddleware = new ValidateCustomerEmailMiddleware();

export { validateCustomerEmailMiddleware }