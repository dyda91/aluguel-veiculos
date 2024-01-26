import { Request, Response, NextFunction } from 'express';
import { EmployeePosition } from '../models/enums/EmployeePosition';

class EmployeePositionMiddleware {
  check(req: Request, res: Response, next: NextFunction) {
    const { position } = req.body;

    try {
      if (!Object.values(EmployeePosition).includes(position)) {
        return res.status(400).json({ error: 'Posição inválida' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const employeePositionMiddleware = new EmployeePositionMiddleware();

export { employeePositionMiddleware };