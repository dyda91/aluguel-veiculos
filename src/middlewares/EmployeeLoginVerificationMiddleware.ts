import { Request, Response, NextFunction } from 'express';
import { employeeRepository } from "../repositories/EmployeeRepository";
import { encrypt } from '../helpers/CryptHelper';

class EmployeeLoginVerificationMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const passwordProvided = encrypt(password);
            const employee = await employeeRepository.getEmployeeByEmail(email);

            if (!employee) {
                res.status(400).json({ error: 'Email ou Senha inválidos' });
            }

            else if (employee.password != passwordProvided) {
                res.status(400).json({ error: 'Email ou Senha inválidos' });
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

const employeeLoginVerificationMiddleware = new EmployeeLoginVerificationMiddleware();

export { employeeLoginVerificationMiddleware }