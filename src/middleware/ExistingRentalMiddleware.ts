import { Request, Response, NextFunction } from 'express';
import { rentalRepository } from '../repositories/rentalRepository';

class ExistingRentalMiddleware {
  async check(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id || req.params.id;

    try {
      const existingRental = await rentalRepository.getRentalById(id);

      if (!existingRental) {
        return res.status(400).json({ error: 'Aluguel não encontrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const existingRentalMiddleware = new ExistingRentalMiddleware();

export { existingRentalMiddleware };
