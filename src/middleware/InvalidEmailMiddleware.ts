import { Request, Response, NextFunction } from 'express';
import { customerRepository } from "../repositories/CustomerRepository";
import { employeeRepository } from "../repositories/EmployeeRepository";

class InvalidEmailMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        const { email} = req.body;
        try {
            const employeeMail = await employeeRepository.getEmployeeByEmail(email);
            const customerMail = await customerRepository.getCustomerByEmail(email);

            if (!customerMail && !employeeMail) {
                res.status(400).json({ error: `Dados informados inválidos` });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const invlaidEmailMiddleware = new InvalidEmailMiddleware();

export { invlaidEmailMiddleware }