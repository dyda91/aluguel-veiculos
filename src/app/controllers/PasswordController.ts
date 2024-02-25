import { Request, Response, NextFunction } from 'express';
import { customerForgotPasswordService } from '../services/customerServices/CustomerForgotPasswordService';
import { employeeForgotPasswordService } from '../services/employeePositionServices/EmployeeForgotPasswordService';
import { customerFindByIdService } from '../services/customerServices/CustomerFindByIdService';
import { customerPasswordUpdateService } from '../services/customerServices/CustomerPasswordUpdateService';
import { employeePasswordUpdateService } from '../services/employeeServices/EmployeePasswordUpdateService';
import { employeeFindByIdService } from '../services/employeeServices/EmployeeFindByIdService';

class PasswordController {
    async forgotCustomerPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, cpf } = req.body;
            const reply = await customerForgotPasswordService.forgotPassword({ email, cpf });
            res.cookie('token', reply, { httpOnly: true, maxAge: 3600000 });
            res.send(reply);
            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }

    async forgotEmployeePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, cpf } = req.body;
            const reply = await employeeForgotPasswordService.forgotPassword({ email, cpf });
            res.cookie('token', reply, { httpOnly: true, maxAge: 3600000 });
            res.send(reply);
            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }

    async changeCustomerPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id;

            const customer = await customerFindByIdService.findById(id);

            if (customer) {
                await customerPasswordUpdateService.passwordUpdate(id, newPassword, confirmNewPassword);
                res.status(200).send({ message: 'Senha atualizada com sucesso!' });
            }

            if (!customer) {
                res.status(404).send({ error: "Usuário não encontrado" });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }

    async changeEmployeePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { newPassword, confirmNewPassword } = req.body;
            const id = req.params.id;
            
            const employee = await employeeFindByIdService.findById(id);

            if (employee) {
                await employeePasswordUpdateService.passwordUpdate(id, newPassword, confirmNewPassword);
                res.status(200).send({ message: 'Senha atualizada com sucesso!' });
            }

            if (!employee) {
                res.status(404).send({ error: "Usuário não encontrado" });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const passwordController = new PasswordController();

export { passwordController }