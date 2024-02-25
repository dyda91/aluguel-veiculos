import { Request, Response, NextFunction } from 'express';
import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import { AppError } from '../../errors/AppError';

class ValidateEmployeeParamsIdMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const employee = await employeeRepository.findById(id);

            if (!employee) {
                return res.status(400).send({ error: 'Customer inválido!' });
            }

            next();
        } catch (error) {
            console.log(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateEmployeeParamsIdMiddleware = new ValidateEmployeeParamsIdMiddleware();

export { validateEmployeeParamsIdMiddleware }