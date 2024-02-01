import { Request, Response, NextFunction } from 'express';
import { customerRepository } from "../repositories/CustomerRepository";
import { encrypt } from '../helpers/CryptHelper';

class CustomerLoginVerificationMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const customer = await customerRepository.getCustomerByEmail(email);
            const passwordProvided = encrypt(password);

            if (!customer) {
                res.status(400).json({ error: 'Email ou Senha inválidos 1' });
            }

            else if (customer.password != passwordProvided) {
                res.status(400).json({ error: 'Email ou Senha inválidos 2' });
            }

            else {
                next();
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const customerLoginVerificationMiddleware = new CustomerLoginVerificationMiddleware();

export { customerLoginVerificationMiddleware }