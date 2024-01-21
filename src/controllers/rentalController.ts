import { Request, Response, NextFunction } from 'express';
import { rentalService } from '../services/RentalService';
import { customerService } from '../services/CustumerService';
import { vehicleService } from '../services/VehicleService';

class RentalController {
  async rentVehicle(req: Request, res: Response, next: NextFunction) {
    const { customerId, vehiclePlate, startDate, endDate } = req.body;

    if (!customerId || !vehiclePlate || !startDate || !endDate) {
      return res.status(400).json({ error: 'Necessário preencher todos os campos' });
    }

    try {
      const customer = await customerService.getCustomerById(customerId);
      if (!customer) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const vehicle = await vehicleService.getVehicleByPlate(vehiclePlate);
      if (!vehicle) {
        return res.status(404).json({ error: 'Veiculo não encontrado' });
      }

      const rental = rentalService.rentVehicle(customer, vehicle, new Date(startDate), new Date(endDate));
      res.status(201).json(rental);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

const rentalController = new RentalController();

export { rentalController };
