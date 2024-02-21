import { Request, Response, NextFunction } from 'express';
import { employeeRepository } from "../../infra/db/sequelize/repositories/employeeRepository";
import bcrypt from 'bcrypt';

class EmployeeForgottenPasswordRequestMiddleware {
    async check(req: Request, res: Response, next: NextFunction) {
        const { email, cpf } = req.body;
        try {
            const employeeEmail = await employeeRepository.getEmployeeByEmail(email);
            
            const employeeCPF = await employeeRepository.getAllEmployees().find(
                (employee) => bcrypt.compareSync(cpf, employee.cpf)
            );            

            if (!employeeEmail) {
                return res.status(400).json({ error: 'Email ou CPF inválidos' });
            }
            
            else if (!employeeCPF) {
                return res.status(400).json({ error: 'Email ou CPF inválidos' });
            }

            else if (employeeEmail != employeeCPF) {
                return res.status(400).json({ error: 'Email ou CPF inválidos' });
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

const employeeForgottenPasswordRequestMiddleware = new EmployeeForgottenPasswordRequestMiddleware();

export { employeeForgottenPasswordRequestMiddleware }