import { Request, Response, NextFunction } from 'express';
import { vehicleService } from '../services/VehicleService';

class VehicleController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicles = await vehicleService.findAll();
      res.send(vehicles);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async findByPlate(req: Request, res: Response, next: NextFunction) {
    try {
      const plate = req.params.plate;
      const vehicle = await vehicleService.findByPlate(plate);

      if (vehicle) {
        res.send(vehicle);
      } else {
        res.status(404).send({ error: 'Veículo não encontrado' });
      }
      
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { plate, manufacturer, model, year, kilometers, category, hourlyRate } = req.body;

      if (!plate || !manufacturer || !model || !year || !kilometers || !category || hourlyRate === undefined) {
        res.status(400).send({ error: 'Necessário preencher todos os campos' });
        return next();
      }
    
      const newVehicle = await vehicleService.create({
        plate,
        manufacturer,
        model,
        year,
        kilometers,
        category,
        hourlyRate,
        isAvailable: true
      });
      res.status(201).send(newVehicle);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }
}

const vehicleController = new VehicleController();

export { vehicleController };
