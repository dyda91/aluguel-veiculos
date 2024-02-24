import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryRepository } from '../../../infra/db/sequelize/repositories/vehicleCategoryRepository';

class ValidateVehicleCategoryMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.body.category;

      if (!category) {
        return res.status(400).json({ error: 'Categoria não especificada' });
      }

      const vehicleCategories = await vehicleCategoryRepository.findAll();

      if (!vehicleCategories || vehicleCategories.length === 0) {
        return res.status(500).json({ error: 'Não foi possível encontrar categorias de veículos' });
      }

      const vehicleCategory = vehicleCategories.find(item => item.name === category.toUpperCase());

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
