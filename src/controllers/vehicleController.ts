import { Request, Response, NextFunction } from 'express';
import { vehicleService } from '../services/vehicleService';

class VehicleController {
  async getAllVehicles(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicles = await vehicleService.getAllVehicles();
      res.send(vehicles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async createVehicle(req: Request, res: Response, next: NextFunction) {
    const { plate, manufacturer, model, year, kilometers, category } = req.body;

    if (!plate || !manufacturer || !model || !year || !kilometers || !category) {
      return res.status(400).json({ error: 'Necessário todos os dados' });
    }

    try {
      const newVehicle = await vehicleService.createVehicle({ plate, manufacturer, model, year, kilometers, category });
      res.status(201).json(newVehicle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

const vehicleController = new VehicleController();

export { vehicleController };
