import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../../../infra/db/sequelize/repositories/customerRepository';
import { AppError } from '../../errors/AppError';

class ValidateCustomerParamsIdMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const customer = await customerRepository.findById(id);

            if (!customer) {
                return res.status(400).send({ error: 'Customer inválido!' });
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateCustomerParamsIdMiddleware = new ValidateCustomerParamsIdMiddleware();

export { validateCustomerParamsIdMiddleware }