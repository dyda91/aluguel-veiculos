import { NextFunction, Request, Response, } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../../errors/AppError";
import { Error } from "sequelize";

class CustomerAuthCookieMiddleware {
    async auth(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token

            if (!token) {
                return res.redirect('/login/customer');
            }

            const secret = process.env.JWT_SECRET!;

            try {
                const decoded = jwt.verify(token, secret);
                if (!decoded) {
                    return res.redirect('/login/customer');
                }
            } catch (error) {
                return res.redirect('/login/customer');
            }

            next();
        } catch (error) {
            console.error(AppError);
            res.status(500).json({ error: 'Erro interno do servidor' });
            next(error);
        }
    }
}

const customerAuthCookieMiddleware = new CustomerAuthCookieMiddleware();

export { customerAuthCookieMiddleware }