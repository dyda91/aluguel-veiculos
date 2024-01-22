import { Request, Response, NextFunction } from 'express';
import { rentalService } from '../services/RentalService';
import { customerService } from '../services/CustomerService';
import { vehicleService } from '../services/VehicleService';
import { parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

class RentalController {
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

      const rental = rentalService.rentVehicle(customer, vehicle, new Date(startDate), new Date(endDate));
      res.status(201).json(rental);
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

const rentalController = new RentalController();

export { rentalController };