import { NextFunction, Request, Response } from "express";
import { employeeRepository } from "../repositories/EmployeeRepository";
import jwt from 'jsonwebtoken';

class EmployeeTokenVerificationMiddleware {
    async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader = req.header('Authorization');
            const accessToken = authorizationHeader.split(' ')[1];
            const secret = process.env.JWT_SECRET_2!;
            const decodedToken = jwt.verify(accessToken, secret);

            const id = decodedToken.id;
            const email = decodedToken.email;
            const cpf = decodedToken.cpf;
            const position = decodedToken.position;

            if (id && email && cpf && position) {
                const employeeId = await employeeRepository.getEmployeeById(id);
                const employeeEmail = await employeeRepository.getEmployeeByEmail(email);
                
                const employeeCPF = await employeeRepository.getAllEmployees().find(
                    (employee) => cpf === employee.cpf
                );

                const employeePosition = await employeeRepository.getAllEmployees().find(
                    (employee) => position === employee.position
                );

                if (!employeeId || !employeeEmail || !employeeCPF || !employeePosition) {
                    return res.status(401).json({ error: 'Token inválido' });
                }

                next();
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const employeeTokenVerificationMiddleware = new EmployeeTokenVerificationMiddleware();

export { employeeTokenVerificationMiddleware }