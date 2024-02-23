import { Request, Response, NextFunction } from 'express';
import { vehicleRepository } from '../../../infra/db/sequelize/repositories/vehicleRepository';

class ValidatePlateVehicleMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const plate = req.body.plate;
      const existingVehicle = await vehicleRepository.findByPlate(plate);

      if (existingVehicle) {
        return res.status(400).json({ error: 'Veículo já cadastrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const validatePlateVehicleMiddleware = new ValidatePlateVehicleMiddleware();

export { validatePlateVehicleMiddleware };
