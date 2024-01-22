import { Request, Response, NextFunction } from 'express';
import { vehicleService } from '../services/VehicleService';

class VehicleController {
  async getAllVehicles(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicles = await vehicleService.getAllVehicles();
      res.send(vehicles);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async getVehicleByPlate(req: Request, res: Response, next: NextFunction) {
    const plate = req.params.plate;

    try {
      const vehicle = await vehicleService.getVehicleByPlate(plate);
      if (vehicle) {
        res.json(vehicle);
      } else {
        res.status(404).json({ error: 'Veículo não encontrado' });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async createVehicle(req: Request, res: Response, next: NextFunction) {
    const { plate, manufacturer, model, year, kilometers, category, hourlyRate } = req.body;

    if (!plate || !manufacturer || !model || !year || !kilometers || !category || hourlyRate === undefined) {
      res.status(400).json({ error: 'Necessário preencher todos os campos' });
      return next();
    }

    try {
      const newVehicle = await vehicleService.createVehicle({
        plate,
        manufacturer,
        model,
        year,
        kilometers,
        category,
        hourlyRate,
      });
      res.status(201).json(newVehicle);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const vehicleController = new VehicleController();

export { vehicleController };
