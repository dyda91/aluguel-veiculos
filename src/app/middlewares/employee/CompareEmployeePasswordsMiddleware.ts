import { Request, Response, NextFunction } from 'express';
import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import { AppError } from '../../errors/AppError';
import { encrypt } from '../../helpers/cryptHelper';

class CompareEmployeePasswordsMiddleware {
    async compare(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id

            const encryptNewPassword = encrypt(newPassword);
            const encryptConfirmNewPassword= encrypt(confirmNewPassword);
            const employee = await employeeRepository.findById(id);

            if (newPassword != confirmNewPassword) {
                res.status(400).json({ error: 'Senha Inválida!' });
            }

            else if (encryptNewPassword === employee.password) {
                res.status(400).json({ error: 'Senha Inválida!' });
            }

            else if (encryptConfirmNewPassword === employee.password) {
                res.status(400).json({ error: 'Senha Inválida!' });
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

const compareEmployeePasswordsMiddleware = new CompareEmployeePasswordsMiddleware();

export { compareEmployeePasswordsMiddleware }