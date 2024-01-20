import { Rental, RentalStatus } from '../models/rentalModel';
import { Vehicle } from '../models/vehicleModel';
import { Customer } from '../models/customerModel';
import { rentalRepository } from '../repositories/rentalRepository';
import { vehicleRepository } from '../repositories/vehicleRepository';
import { v4 as uuidv4 } from 'uuid';

class RentalService {
  rentVehicle(customer: Customer, vehicle: Vehicle, startDate: Date, endDate: Date): Rental {
    const isVehicleAvailable = rentalRepository.isVehicleAvailable(vehicle.plate, startDate, endDate);
    if (!isVehicleAvailable) {
      throw new Error('Vehicle is not available for the specified period');
    }

    const rentalDays = this.calculateRentalDays(startDate, endDate);
    const rentalAmount = this.calculateRentalAmount(vehicle.hourlyRate, rentalDays, startDate, endDate);


    const rental: Rental = {
      id: uuidv4(), 
      customer,
      vehicle,
      startDate,
      endDate,
      rentalDays,
      rentalAmount,
      status: RentalStatus.PENDING,
    };

    rentalRepository.createRental(rental);
    vehicleRepository.updateVehicleStatus(vehicle.plate, false);

    return rental;
  }

  private calculateRentalDays(startDate: Date, endDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay));
    return diffDays + 1; 
  }

  private calculateRentalAmount(hourlyRate: number, rentalDays: number, startDate: Date, endDate: Date): number {
    const oneHour = 60 * 60 * 1000;
    const hoursUsed = (endDate.getTime() - startDate.getTime()) / oneHour;
    const roundedHours = Math.ceil(hoursUsed);
  
    return hourlyRate * roundedHours * rentalDays;
  }
  
}

const rentalService = new RentalService();

export { rentalService };

