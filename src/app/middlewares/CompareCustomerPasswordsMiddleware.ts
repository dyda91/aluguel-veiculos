import { Request, Response, NextFunction } from 'express';
import { customerRepository } from '../../infra/db/sequelize/repositories/customerRepository';
import { AppError } from '../errors/AppError';
import { encrypt } from '../helpers/cryptHelper';

class CompareCustomerPasswordsMiddleware {
    async compare(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id

            const encryptNewPassword = encrypt(newPassword);
            const encryptConfirmNewPassword= encrypt(confirmNewPassword);
            const customer = await customerRepository.getCustomerById(id);

            if (newPassword != confirmNewPassword) {
                res.status(400).json({ error: 'Senha Inválida!' });
            }

            else if (encryptNewPassword === customer.password) {
                res.status(400).json({ error: 'Senha Inválida!' });
            }

            else if (encryptConfirmNewPassword === customer.password) {
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

const compareCustomerPasswordsMiddleware = new CompareCustomerPasswordsMiddleware();

export { compareCustomerPasswordsMiddleware }