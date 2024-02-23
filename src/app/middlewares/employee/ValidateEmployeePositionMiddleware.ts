import { Request, Response, NextFunction } from 'express';
import { employeePositionRepository } from '../../../infra/db/sequelize/repositories/employeePositionRepository';

class ValidateEmployeePositionMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { position } = req.body;
      const employeePosition = (await employeePositionRepository.findAll()).find(item => item.name === position.toUpperCase());

      if (!employeePosition) {
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

const validateEmployeePositionMiddleware = new ValidateEmployeePositionMiddleware();

export { validateEmployeePositionMiddleware };