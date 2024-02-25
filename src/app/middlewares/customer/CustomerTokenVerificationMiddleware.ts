import { NextFunction, Request, Response } from "express";
import { customerRepository } from "../../../infra/db/sequelize/repositories/customerRepository";
import jwt from 'jsonwebtoken';
import { log } from "handlebars";
import { AppError } from "../../errors/AppError";

class CustomerTokenVerificationMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader = req.header('Authorization');
            const accessToken = authorizationHeader.split(' ')[1];
            const secret = process.env.JWT_SECRET_2!;
            const decodedToken: any = jwt.verify(accessToken, secret);

            const id = decodedToken.id;
            const email = decodedToken.email;
            const cpf = decodedToken.cpf;

            if (id && email && cpf) {
                const customerId = await customerRepository.findById(id);
                const customerEmail = await customerRepository.findByEmail(email);
                const customer= await customerRepository.findByCpf(cpf)
                const customerCPF = await cpf === await customer.cpf

                if (!customerId || !customerEmail || !customerCPF) {
                    return res.status(401).json({ error: 'Token inválido' });
                } 

                next();
            }
        }
        catch (error) {
            console.error(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const customerTokenVerificationMiddleware = new CustomerTokenVerificationMiddleware();

export { customerTokenVerificationMiddleware }