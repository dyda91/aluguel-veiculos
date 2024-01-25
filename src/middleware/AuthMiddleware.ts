import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../errors/AppError";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header('Authorization');
    
    if (!authorizationHeader) {
      throw new AppError('Token não informado');
    }
    
    if (!authorizationHeader.toLocaleLowerCase().startsWith('bearer ')) {
      throw new AppError('Token inválido');
    }
    
    const accessToken = authorizationHeader.split(' ')[1];

    const secret = process.env.JWT_SECRET!;
    
    jwt.verify(accessToken, secret);
    next();
  } catch (err) {
    res.status(401).send({ mensagem: err.message });
  }
}