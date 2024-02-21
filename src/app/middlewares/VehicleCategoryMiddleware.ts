import { Request, Response, NextFunction } from 'express';

class VehicleCategoryMiddleware {
  validateCategory(req: Request, res: Response, next: NextFunction) {
    const { category } = req.body;

    try {
      if (!Object.values(VehicleCategory).includes(category)) {
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

const vehicleCategoryMiddleware = new VehicleCategoryMiddleware();

export { vehicleCategoryMiddleware };
