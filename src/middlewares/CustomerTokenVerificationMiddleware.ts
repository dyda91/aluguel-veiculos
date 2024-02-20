import { NextFunction, Request, Response } from "express";
import { customerRepository } from "../repositories/CustomerRepository";
import jwt from 'jsonwebtoken';

class CustomerTokenVerificationMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader = req.header('Authorization');
            const accessToken = authorizationHeader.split(' ')[1];
            const secret = process.env.JWT_SECRET_2!;
            const decodedToken = jwt.verify(accessToken, secret);

            const id = decodedToken.id;
            const email = decodedToken.email;
            const cpf = decodedToken.cpf;

            if (id && email && cpf) {
                const customerId = await customerRepository.getCustomerById(id);
                const customerEmail = await customerRepository.getCustomerByEmail(email);
                const customerCPF = await customerRepository.getAllCustomers().find(
                    (customer) => cpf === customer.cpf
                );

                if (!customerId || !customerEmail || !customerCPF) {
                    return res.status(401).json({ error: 'Token inválido' });
                } 

                next();
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const customerTokenVerificationMiddleware = new CustomerTokenVerificationMiddleware();

export { customerTokenVerificationMiddleware }