import { Request, Response, NextFunction } from 'express';
import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import bcrypt from 'bcrypt';
import { AppError } from '../../errors/AppError';

class ValidateEmployeeCpfMiddleware {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpf } = req.body;
            const employee = await employeeRepository.findByCpf(cpf);

            if (employee) {
                const compareCpf = await bcrypt.compare(cpf, employee.cpf);
                if (compareCpf) {
                    return res.status(400).json({ error: 'CPF já cadastrado' });
                }
            }

            if (cpf.length !== 11) {
                return res.status(400).json({ error: 'CPF deve ter 11 caracteres' });
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const validateEmployeeCpfMiddleware = new ValidateEmployeeCpfMiddleware();

export { validateEmployeeCpfMiddleware };
