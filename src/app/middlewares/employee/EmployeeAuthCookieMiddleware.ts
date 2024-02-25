import { NextFunction, Request, Response, } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../../errors/AppError";
import { Error } from "sequelize";

class EmployeeAuthCookieMiddleware {
    async auth(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token

            if (!token) {
                return res.redirect('/login/employee');
            }

            const secret = process.env.JWT_SECRET!;

            try {
                const decoded = jwt.verify(token, secret);
                if (!decoded) {
                    return res.redirect('/login/employee');
                }
            } catch (error) {
                return res.redirect('/login/employee');
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const employeeAuthCookieMiddleware = new EmployeeAuthCookieMiddleware();

export { employeeAuthCookieMiddleware }