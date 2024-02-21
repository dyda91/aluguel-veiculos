import { Request, Response, NextFunction } from 'express';
import { rentalService } from '../services/RentalService';
import { customerService } from '../services/CustomerService';
import { vehicleService } from '../services/VehicleService';
import { parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

class RentalController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const rentals = await rentalService.findAll();
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
      const rental = await rentalService.findById(rentalId);
      res.send(rental);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async rentVehicle(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, vehiclePlate, startDate, endDate } = req.body;

      if (!customerId || !vehiclePlate || !startDate || !endDate) {
        res.status(400).send({ error: 'Necessário preencher todos os campos' });
        return next();
      }

      const customer = await customerService.findById(customerId);
      if (!customer) {
        res.status(404).send({ error: 'Cliente não encontrado' });
        return next();
      }
  
      const vehicle = await vehicleService.findByPlate(vehiclePlate);
      if (!vehicle) {
        res.status(404).send({ error: 'Veículo não encontrado' });
        return next();
      }
      
      const formattedStartDate = parse(startDate, 'dd-MM-yyyy HH:mm', new Date(), { locale: ptBR });
      const formattedEndDate = parse(endDate, 'dd-MM-yyyy HH:mm', new Date(), { locale: ptBR });
      const rental = await rentalService.create(customer, vehicle, formattedStartDate, formattedEndDate);
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
      const formattedStartDate = parse(startDate, 'dd-MM-yyyy HH:mm', new Date(), { locale: ptBR });
      rentalService.startRental(id, formattedStartDate);
      res.status(200).send({ message: 'Veículo retirado da locadora pelo cliente' });
      next();
    } catch (error) {
      res.status(400).send({ error: error.message });
      next(error);
    }
  }

  async completeRental(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, endDate } = req.body;
      const formattedEndDate = parse(endDate, 'dd-MM-yyyy HH:mm', new Date(), { locale: ptBR });
      rentalService.completeRental(id, formattedEndDate);
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