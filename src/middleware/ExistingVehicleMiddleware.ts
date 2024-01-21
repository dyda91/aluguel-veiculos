import { Request, Response, NextFunction } from 'express'; 
import { vehicleRepository } from '../repositories/VehicleRepository';

class ExistingVehicleMiddleware {
  async checkExistingVehicle(req: Request, res: Response, next: NextFunction) {
    const plate = req.body.plate;

    try {
      const existingVehicle = vehicleRepository.getVehicleByPlate(plate);

      if (existingVehicle) {
        return res.status(401).json({ error: 'Veículo já cadastrado' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

const existingVehicleMiddleware = new ExistingVehicleMiddleware();

export { existingVehicleMiddleware };
