import { Request, Response, NextFunction } from 'express';
import { customerRepository } from "../repositories/CustomerRepository";
import { employeeRepository } from "../repositories/EmployeeRepository";
import bcrypt from 'bcrypt';

class InvalidCPF_Middleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        const { cpf } = req.body;
        try {
            const existingCustomer = await customerRepository.getAllCustomers().find(
                (customer) => bcrypt.compareSync(cpf, customer.cpf)
            );
            const existingEmployee = await employeeRepository.getAllEmployees().find(
                (employee) => bcrypt.compareSync(cpf, employee.cpf)
            );


            if (!existingEmployee && !existingCustomer) {
                return res.status(400).json({ error: `Dados informados inválidos` });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const invalidCPF_Middleware = new InvalidCPF_Middleware();

export { invalidCPF_Middleware }