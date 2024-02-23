import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryRepository } from '../../../infra/db/sequelize/repositories/vehicleCategoryRepository';

class ValidateVehicleCategoryMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
     try {
      const category = req.body.category;
      
      const vehicleCategory = (await vehicleCategoryRepository.findAll()).find(item => item.name === category.toUpperCase())

      if (!vehicleCategory) {
        return res.status(400).json({ error: 'Categoria inválida' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const validateVehicleCategoryMiddleware = new ValidateVehicleCategoryMiddleware();

export { validateVehicleCategoryMiddleware };
