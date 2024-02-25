import { Request, Response, NextFunction } from 'express';
import { rentalRepository } from '../../infra/db/sequelize/repositories/rentalRepository';
import { AppError } from '../errors/AppError';

class ExistingRentalMiddleware {
  async check(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id || req.params.id;

    try {
      const existingRental = await rentalRepository.findById(id);

      if (!existingRental) {
        return res.status(400).json({ error: 'Aluguel não encontrado' });
      }

      next();
    } catch (error) {
      console.error(AppError);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const existingRentalMiddleware = new ExistingRentalMiddleware();

export { existingRentalMiddleware };
