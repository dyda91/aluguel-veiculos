import { Request, Response, NextFunction } from 'express';
import { rentalService } from '../services/RentalService';
import { customerService } from '../services/CustumerService';
import { RentalStatus } from '../models/Rental';
import { vehicleService } from '../services/VehicleService';

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

  async rentVehicle(req: Request, res: Response, next: NextFunction) {
    const { customerId, vehiclePlate, startDate, endDate } = req.body;
    console.log(req.body);
  
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
  
      const rental = await rentalService.rentVehicle(customer, vehicle, new Date(startDate), new Date(endDate));
      res.status(201).json(rental);
      next();
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
      next(error);  
    }
  }


  async initRental(req: Request, res: Response, next: NextFunction) {
    const rentalId = req.params.id;
  
    try {
      rentalService.initRental(rentalId);
      res.status(200).json({ message: 'Veículo retirado da locadora pelo cliente' });
      next();
    } catch (error) {
      res.status(400).json({ error: error.message});
      next();
    }
  }
  
}

const rentalController = new RentalController();

export { rentalController };
