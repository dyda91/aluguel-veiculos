import { Request, Response, NextFunction } from 'express';
import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import { AppError } from '../../errors/AppError';

class ValidateEmployeeEmailMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const employee = await employeeRepository.findByEmail(email);

            if (employee) {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateEmployeeEmailMiddleware = new ValidateEmployeeEmailMiddleware();

export { validateEmployeeEmailMiddleware }