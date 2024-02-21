import { Request, Response, NextFunction } from 'express';
import { vehicleCategoryService } from '../services/VehicleCategoryService';

class VehicleCategoryController {
    async findAll(req: Request, res: Response, next: NextFunction) {
      try {
        const vehicleCategories = await vehicleCategoryService.findAll();
        res.send(vehicleCategories);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
  
    async findById(req: Request, res: Response, next: NextFunction) {
      try {
        const id = req.params.id;
        const vehicleCategory = await vehicleCategoryService.findById(id);
  
        if (vehicleCategory) {
          res.send(vehicleCategory);
        } else {
          res.status(404).send({ error: 'Licensa não encontrada' });
        }
        
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
  
    async create(req: Request, res: Response, next: NextFunction) {
      try {
        const { name } = req.body;
  
        if (!name) {
          res.status(400).send({ error: 'Necessário fornecer todos os dados' });
          return next();
        }
        
        const upperCaseName = name.toUpperCase();
        const newvehicleCategory = await vehicleCategoryService.create({name: upperCaseName});
        res.status(201).send(newvehicleCategory);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
  }
  
  const vehicleCategoryController = new VehicleCategoryController();
  
  export { vehicleCategoryController };