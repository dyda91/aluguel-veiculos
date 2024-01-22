import { Request, Response, NextFunction } from 'express';
import { rentalService } from '../services/RentalService';
import { customerService } from '../services/CustomerService';
import { vehicleService } from '../services/VehicleService';
import { parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

class RentalController {
  async getAllRentals(req: Request, res: Response, next: NextFunction) {
    try {
      const rentals = await rentalService.getAllRentals();
      res.send(rentals);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async getRentalById(req: Request, res: Response, next: NextFunction) {
    const rentalId = req.params.id;

    try {
      const rental = await rentalService.getRentalById(rentalId);
      if (rental) {
        res.json(rental);
      } else {
        res.status(404).json({ error: 'Aluguel não encontrado' });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor' });
      next(error);
    }
  }

  async rentVehicle(req: Request, res: Response, next: NextFunction) {
    const { customerId, vehiclePlate, startDate, endDate } = req.body;

    if (!customerId || !vehiclePlate || !startDate || !endDate) {
      res.status(400).json({ error: 'Necessário preencher todos os campos' });
      return next();
    }

    try {
      const customer = await customerService.getCustomerById(customerId);
      if (!customer) {
        res.status(404).json({ error: 'Cliente não encontrado' });
        return next();
      }

      const vehicle = await vehicleService.getVehicleByPlate(vehiclePlate);
      if (!vehicle) {
        res.status(404).json({ error: 'Veículo não encontrado' });
        return next();
      }

      const formattedStartDate = parse(startDate, 'dd-MM-yyyy HH:mm', new Date(), { locale: ptBR });
      const formattedEndDate = parse(endDate, 'dd-MM-yyyy HH:mm', new Date(), { locale: ptBR });

      const rental = await rentalService.rentVehicle(customer, vehicle, formattedStartDate, formattedEndDate);
      res.status(201).json(rental);
      next();
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  async startRental(req: Request, res: Response, next: NextFunction) {
    const rentalId = req.params.id;

    try {
      rentalService.startRental(rentalId);
      res.status(200).json({ message: 'Veículo retirado da locadora pelo cliente' });
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }

  async completeRental(req: Request, res: Response, next: NextFunction) {
    const rentalId = req.params.id;
    const { endDate } = req.body;

    try {
      const formattedEndDate = parse(endDate, 'dd-MM-yyyy HH:mm', new Date(), { locale: ptBR });
      rentalService.completeRental(rentalId, formattedEndDate);
      res.status(200).json({ message: 'Devolução do veículo concluída com sucesso' });
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
      next(error);
    }
  }
}

const rentalController = new RentalController();

export { rentalController };