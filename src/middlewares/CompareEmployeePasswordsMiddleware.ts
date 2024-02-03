import { Request, Response, NextFunction } from 'express';
import { employeeRepository } from '../repositories/EmployeeRepository';
import { AppError } from '../errors/AppError';
import { encrypt } from '../helpers/CryptHelper';

class CompareEmployeePasswordsMiddleware {
    async compare(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id

            const encryptNewPassword = encrypt(newPassword);
            const encryptConfirmNewPassword= encrypt(confirmNewPassword);
            const employee = await employeeRepository.getEmployeeById(id);

            if (newPassword != confirmNewPassword) {
                res.status(400).json({ error: 'Senha Inválida 1!' });
            }

            else if (encryptNewPassword === employee.password) {
                res.status(400).json({ error: 'Senha Inválida 2!' });
            }

            else if (encryptConfirmNewPassword === employee.password) {
                res.status(400).json({ error: 'Senha Inválida 3!' });
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