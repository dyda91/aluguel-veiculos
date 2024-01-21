import { Request, Response, NextFunction } from 'express';
import { vehicleRepository } from '../repositories/VehicleRepository';

class ExistingVehicleMiddleware {
  async checkExistingVehicle(req: Request, res: Response, next: NextFunction) {
    const plate = req.body.plate;

    const isValidPlateFormat = (plate: string): boolean => {
      const format1 = /^[A-Z]{3}\d[A-Z]\d{2}$/;
      const format2 = /^[A-Z]{3}\d{4}$/;

      return format1.test(plate) || format2.test(plate);
    };

    try {
      const existingVehicle = vehicleRepository.getVehicleByPlate(plate);

      if (existingVehicle) {
        return res.status(400).json({ error: 'Veículo já cadastrado' });
      }

      if (!isValidPlateFormat(plate)) {
        return res.status(400).json({ error: 'Formato de placa inválido' });
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
