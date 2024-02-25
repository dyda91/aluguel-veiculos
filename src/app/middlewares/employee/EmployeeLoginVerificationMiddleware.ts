import { Request, Response, NextFunction } from 'express';
import { employeeRepository } from "../../../infra/db/sequelize/repositories/employeeRepository";
import { encrypt } from '../../helpers/cryptHelper';
import { AppError } from '../../errors/AppError';

class EmployeeLoginVerificationMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const passwordProvided = encrypt(password);
            const employee = await employeeRepository.findByEmail(email);

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
            console.error(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const employeeLoginVerificationMiddleware = new EmployeeLoginVerificationMiddleware();

export { employeeLoginVerificationMiddleware }