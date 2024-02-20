import { Request, Response, NextFunction } from 'express';
import { vehicleRepository } from '../repositories/VehicleRepository';

class ExistingVehicleMiddleware {
  async check(req: Request, res: Response, next: NextFunction) {
    try {
      const plate = req.body.plate;
      const existingVehicle = await vehicleRepository.getVehicleByPlate(plate);

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

const existingVehicleMiddleware = new ExistingVehicleMiddleware();

export { existingVehicleMiddleware };
