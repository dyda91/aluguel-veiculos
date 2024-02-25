import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../errors/AppError";

class AuthMiddleware {
  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.header('Authorization');

      if (!authorizationHeader) {
        return res.status(400).send({ error: 'Token Inválido' });
      }

      if (!authorizationHeader.toLocaleLowerCase().startsWith('bearer ')) {
        return res.status(400).send({ error: 'Token Inválido' });
      }

      const accessToken = authorizationHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET!;

      try {
        jwt.verify(accessToken, secret);
      } catch (error) {
        return res.status(400).send({ error: 'Token Inválido' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const authMiddleware = new AuthMiddleware();

export { authMiddleware }