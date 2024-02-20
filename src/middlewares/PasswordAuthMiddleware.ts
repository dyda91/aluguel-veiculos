import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

class PasswordAuthMiddleware {
  execute(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.header('Authorization');

      if (!authorizationHeader) {
        return res.status(400).json({ error: 'Token não informado' });
      }

      if (!authorizationHeader.toLocaleLowerCase().startsWith('bearer ')) {
        return res.status(400).json({ error: 'Token não informado' });
      }

      const accessToken = authorizationHeader.split(' ')[1];

      const secret = process.env.JWT_SECRET_2!;

      jwt.verify(accessToken, secret);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const passwordAuthMiddleware = new PasswordAuthMiddleware();

export {passwordAuthMiddleware}