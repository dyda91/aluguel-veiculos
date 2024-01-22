import { Rental, RentalStatus } from '../models/Rental';
import { Vehicle } from '../models/Vehicle';
import { Customer } from '../models/Customer';
import { rentalRepository } from '../repositories/RentalRepository';
import { vehicleRepository } from '../repositories/VehicleRepository';
import { customerRepository } from '../repositories/CustomerRepository';
import { v4 as uuidv4 } from 'uuid';

class RentalService {
  getAllRentals() {
    return rentalRepository.getAllRentals();
  }

  getRentalById(rentalId: string) {
    return rentalRepository.getRentalById(rentalId);
  }

  rentVehicle(customer: Customer, vehicle: Vehicle, startDate: Date, endDate: Date): Rental {
    const existingCustomer = customerRepository.getCustomerById(customer.id);
    const existingVehicle = vehicleRepository.getVehicleByPlate(vehicle.plate);
    const isVehicleAvailable = rentalRepository.isVehicleAvailable(existingVehicle.plate, startDate, endDate);

    if (!existingCustomer) {
      throw new Error('Cliente não encontrado');
    }

    if (!existingVehicle) {
      throw new Error('Veículo não encontrado');
    }
    
    if (!isVehicleAvailable) {
      throw new Error('Veículo não disponível para o período');
    }

    const rentalDays = this.calculateRentalDays(startDate, endDate);
    const rentalAmount = this.calculateRentalAmount(existingVehicle.hourlyRate, rentalDays, startDate, endDate);

    const rental: Rental = {
      id: uuidv4(),
      customer: existingCustomer,
      vehicle: existingVehicle,
      startDate,
      endDate,
      rentalDays,
      rentalAmount,
      status: RentalStatus.PENDING,
    };

    rentalRepository.createRental(rental);

    return rental;
  }

  startRental(rentalId: string): void {
    const rental = rentalRepository.getRentalById(rentalId);
    if (!rental) {
      throw new Error('Aluguel não encontrado');
    }

    if (rental.status !== RentalStatus.PENDING) {
      throw new Error('Status do Aluguel inválido');
    }

    rentalRepository.updateRentalStatus(rentalId, RentalStatus.ACTIVE);
    vehicleRepository.updateVehicleStatus(rental.vehicle.plate, false);
  }

  completeRental(rentalId: string): void {
    const rental = rentalRepository.getRentalById(rentalId);

    if (!rental) {
      throw new Error('Aluguel não encontrado');
    }

    if (rental.status !== RentalStatus.ACTIVE) {
      throw new Error('Somente alugueis ativos podem ser concluídos');
    }

    rentalRepository.updateRentalStatus(rentalId, RentalStatus.COMPLETED);
    vehicleRepository.updateVehicleStatus(rental.vehicle.plate, true);
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

