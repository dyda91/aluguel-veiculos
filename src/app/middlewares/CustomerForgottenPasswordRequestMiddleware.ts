import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../../infra/db/sequelize/repositories/customerRepository';
import bcrypt from 'bcrypt';


class CustomerForgottenPasswordRequestMiddleware {
    async check(req: Request, res: Response, next: NextFunction) {
        const { email, cpf } = req.body;
        try {
            const customerEmail = await customerRepository.findByEmail(email);
            
            const customerCPF = await customerRepository.findByCpf(cpf)
            const compareCustomerCpf = await bcrypt.compareSync(cpf, (await customerCPF).cpf)
                 

            if (!customerEmail) {
                return res.status(400).json({ error: 'Email ou CPF inválidos' });
            }    

            else if (!compareCustomerCpf) {
                return res.status(400).json({ error: 'Email ou CPF inválidos' });
            }

            else if (customerEmail != customerCPF) {
                return res.status(400).json({ error: 'Email ou CPF inválidos' });
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

const customerForgottenPasswordRequestMiddleware = new CustomerForgottenPasswordRequestMiddleware();

export { customerForgottenPasswordRequestMiddleware }