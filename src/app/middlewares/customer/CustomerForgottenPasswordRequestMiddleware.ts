import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../../../infra/db/sequelize/repositories/customerRepository';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';


class CustomerForgottenPasswordRequestMiddleware {
    async check(req: Request, res: Response, next: NextFunction) {
        const { email, cpf } = req.body;
        try {
            const customerEmail = await customerRepository.findByEmail(email);
            
            const customerCpf = await customerRepository.findByCpf(cpf);
            const cpfString = String(cpf);
            const compareCustomerCpf = bcrypt.compareSync(cpfString, customerCpf.cpf);

            if (!customerEmail) {
                return res.status(400).json({ error: 'Email ou CPF inválidos' });
            }    

            if (!compareCustomerCpf) {
                console.log(customerCpf.cpf + " " + cpf);
                return res.status(400).json({ error: 'Email ou CPF inválidos' });
            }

            if (!customerCpf) {
                return res.status(400).json({ error: 'Email ou CPF inválidos' });
            }

            if (customerCpf.id != customerEmail.id) {
                return res.status(400).json({ error: 'Email ou CPF inválidos' });
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

const customerForgottenPasswordRequestMiddleware = new CustomerForgottenPasswordRequestMiddleware();

export { customerForgottenPasswordRequestMiddleware }