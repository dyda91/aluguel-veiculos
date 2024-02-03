import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../repositories/CustomerRepository';
import bcrypt from 'bcrypt';


class CustomerForgottenPasswordRequestMiddleware {
    async check(req: Request, res: Response, next: NextFunction) {
        const { email, cpf } = req.body;
        try {
            const customerEmail = await customerRepository.getCustomerByEmail(email);
            
            const customerCPF = await customerRepository.getAllCustomers().find(
                (customer) => bcrypt.compareSync(cpf, customer.cpf)
            );            

            if (!customerEmail) {
                return res.status(400).json({ error: 'Email ou CPF inválidos' });
            }    

            else if (!customerCPF) {
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