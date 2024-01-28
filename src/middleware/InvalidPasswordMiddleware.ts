import { Request, Response, NextFunction } from 'express';
import { customerRepository } from "../repositories/CustomerRepository";
import { employeeRepository } from "../repositories/EmployeeRepository";
import { encrypt } from '../helpers/CryptHelper';

class InvalidPasswordMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const { password } = req.body;
            const passwordProvided = encrypt(password);
            
            const customer = await customerRepository.getCustomerByPassword(passwordProvided);
            const employee = await employeeRepository.getEmployeeByPassword(passwordProvided);

            if (!customer && !employee) {
                res.status(400).json({ error: 'Dados informados inválidos' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const invalidPasswordMiddleware = new InvalidPasswordMiddleware();

export { invalidPasswordMiddleware }