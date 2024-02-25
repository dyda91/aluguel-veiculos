import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../../../infra/db/sequelize/repositories/customerRepository';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';

class ValidateCustomerCpfMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpf } = req.body;
            const customer = await customerRepository.findByCpf(cpf);

            if (customer) {
                const compareCpf = await bcrypt.compare(cpf, customer.cpf);
                if (compareCpf) {
                    return res.status(400).json({ error: 'CPF já cadastrado' });
                }
            }

            if (cpf.length !== 11) {
                return res.status(400).json({ error: 'CPF deve ter 11 caracteres' });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(500).json({ AppError: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateCustomerCpfMiddleware = new ValidateCustomerCpfMiddleware();

export { validateCustomerCpfMiddleware };