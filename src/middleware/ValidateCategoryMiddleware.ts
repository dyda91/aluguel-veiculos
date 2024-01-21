import { Request, Response, NextFunction } from 'express';
import { VehicleCategory } from '../models/Vehicle';

class ValidateCategoryMiddleware {
  async validateCategory(req: Request, res: Response, next: NextFunction) {
    const { category } = req.body;

    try {
        if (!Object.values(VehicleCategory).includes(category)) {
            return res.status(400).json({ error: 'Categoria inválida' });
        }

        next();
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } 
  }
}

const validateCategoryMiddleware = new ValidateCategoryMiddleware();

export { validateCategoryMiddleware };
