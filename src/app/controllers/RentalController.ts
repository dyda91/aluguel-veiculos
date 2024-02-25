import { Request, Response, NextFunction } from 'express';
import { parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { rentalFindAllService } from '../services/RentalService/RentalFindAllService';
import { rentalFindByIdService } from '../services/RentalService/RentalFindByIdService';
import { customerFindByIdService } from '../services/customerServices/CustomerFindByIdService';
import { vehicleFindByPlateService } from '../services/vehiclesServices/VehicleFindByPlateService';
import { rentalReserveService } from '../services/RentalService/RentalReserveService';
import { rentalStartService } from '../services/RentalService/RentalStartService';
import { rentalCompleteService } from '../services/RentalService/RentalCompleteService';

class RentalController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const rentals = await rentalFindAllService.findAll();
      res.send(rentals);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const rentalId = req.params.id;
      const rental = await rentalFindByIdService.findById(rentalId);
      res.send(rental);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async reserveRental(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, vehiclePlate, startDate, endDate } = req.body;
      const status = "PENDING";

      if (!customerId || !vehiclePlate || !startDate || !endDate) {
        res.status(400).send({ error: 'Necessário preencher todos os campos' });
        return next();
      }

      const customer = await customerFindByIdService.findById(customerId);
      if (!customer) {
        res.status(404).send({ error: 'Cliente não encontrado' });
        return next();
      }
  
      const vehicle = await vehicleFindByPlateService.findByPlate(vehiclePlate);
      if (!vehicle) {
        res.status(404).send({ error: 'Veículo não encontrado' });
        return next();
      }
      
      const formattedStartDate = parse(startDate, "dd-MM-yyyy HH:mm", new Date());
      const formattedEndDate = parse(endDate, 'dd-MM-yyyy HH:mm', new Date(), { locale: ptBR });
      const rental = await rentalReserveService.reserve(customer, vehicle, formattedStartDate, formattedEndDate, status);
      res.status(201).send(rental);
      next();
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
      next(error);
    }
  }

  async startRental(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, startDate } = req.body;
      console.log("Data inicial formatada no controller",startDate)
      const formattedStartDate = parse(startDate, "dd-MM-yyyy HH:mm", new Date());    
      rentalStartService.startRental(id, formattedStartDate);
      res.status(200).send({ message: 'Veículo retirado da locadora pelo cliente' });
      next();
    } catch (error) {
      res.status(400).send({ error: error.message });
      next(error);
    }
  }

  async completeRental(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, endDate, startDate } = req.body;
      const formattedStartDate = parse(startDate, "dd-MM-yyyy HH:mm", new Date());
      const formattedEndDate = parse(endDate, 'dd-MM-yyyy HH:mm', new Date(), { locale: ptBR });

      console.log("Data inicial formatada no controller",formattedStartDate)
      console.log("Data final formatada no controller",formattedEndDate)

      rentalCompleteService.completeRental(id, formattedEndDate, formattedStartDate);
      res.status(200).send({ message: 'Devolução do veículo concluída com sucesso' });
      next();
    } catch (error) {
      res.status(400).send({ error: error.message });
      next(error);
    }
  }
}

const rentalController = new RentalController();

export { rentalController };