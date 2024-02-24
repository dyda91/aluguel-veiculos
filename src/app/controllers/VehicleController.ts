import { Request, Response, NextFunction } from 'express';
import path from 'path';
import handlebars from 'handlebars';
import { createTemplate } from "../helpers/createTemplate";
import { vehicleFindAllService } from '../services/vehiclesServices/VehicleFindAllService';
import { vehicleFindByPlateService } from '../services/vehiclesServices/VehicleFindByPlateService';
import { vehicleCategoryFindAllService } from '../services/vehiclesCategoryServices/VehicleCategoryFindAllService';
import { vehicleCreateService } from '../services/vehiclesServices/VehicleCreateService';

class VehicleController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicles = await vehicleFindAllService.findAll();
      res.status(200).format({
        'application/json': () => {
          res.send(vehicles);
        },
        'text/html': () => {
          const caminhoTemplate = createTemplate(path.resolve(
            __dirname,
            '..',
            '..',
            'infra',
            'templates',
            'handlebars',
            'vehiclesFindAll.hbs'
          ));

          const template = handlebars.compile(caminhoTemplate);
          res.send(template({
            vehicles
          }));
        }
      })
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async findByPlate(req: Request, res: Response, next: NextFunction) {
    try {
      const plate = req.params.plate;
      const vehicle = await vehicleFindByPlateService.findByPlate(plate);

      if (vehicle) {
        res.status(200).format({
          'application/json': () => {
            res.send(vehicle);
          },
          'text/html': () => {
            const caminhoTemplate = createTemplate(path.resolve(
              __dirname,
              '..',
              '..',
              'infra',
              'templates',
              'handlebars',
              'vehicleFind.hbs'
            ));

            const template = handlebars.compile(caminhoTemplate);
            res.send(template({
              plate: vehicle.plate,
              manufacturer: vehicle.manufacturer,
              model: vehicle.model,
              year: vehicle.year,
              kilometers: vehicle.kilometers,
              category: vehicle.category,
              hourlyRate: vehicle.hourlyRate
            }));
          }
        })
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

      if (!plate || !manufacturer || !model || !year || !kilometers || !category || !hourlyRate) {
        res.status(400).send({ error: 'Necessário preencher todos os campos' });
        return next();
      }

      const vehicleCategory = (await vehicleCategoryFindAllService.findAll()).find(item => item.name === category.toUpperCase())

      if (vehicleCategory) {
        const newVehicle = await vehicleCreateService.create({
          plate,
          manufacturer,
          model,
          year,
          kilometers,
          category: vehicleCategory.id,
          hourlyRate,
          isAvailable: true
        });
        res.status(201).format({
          'application/json': () => {
            res.send(newVehicle);
          },
        })
      }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro interno do servidor' });
        next(error);
      }
    }
}

  const vehicleController = new VehicleController();

export { vehicleController };
