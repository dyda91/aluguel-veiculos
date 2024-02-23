import { rentalRepository } from '../../../infra/db/sequelize/repositories/rentalRepository';
import { vehicleRepository } from '../../../infra/db/sequelize/repositories/vehicleRepository';
import { customerRepository } from '../../../infra/db/sequelize/repositories/customerRepository';
import { VehicleRequest } from '../vehiclesServices/VehicleCreateService';
import { CustomerRequest } from '../customerServices/CustomerCreateService';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../../errors/AppError';

class RentalReserveService {
  async reserve(customer: CustomerRequest, vehicle: VehicleRequest, startDate: Date, endDate: Date, status: string) {
    console.log(customer);
    const existingCustomer = await customerRepository.findById(customer.id);
    const existingVehicle = await vehicleRepository.findByPlate(vehicle.plate);
    // const isVehicleAvailable = await rentalRepository.isVehicleAvailable(existingVehicle.plate, startDate, endDate);

    const vehiclePlate = await existingVehicle.plate;
    const customerId = await existingCustomer.id;

    if (!existingCustomer) {
      throw new AppError('Cliente não encontrado');
    }

    if (!existingVehicle) {
      throw new AppError('Veículo não encontrado');
    }

    // if (!isVehicleAvailable) {
    //   throw new AppError('Veículo não disponível para o período');
    // }

    const rentalDays = await this.calculateRentalDays(startDate, endDate);
    const rentalAmount = await this.calculateRentalAmount(existingVehicle.hourlyRate, rentalDays, startDate, endDate);

    const stringStartDate = String(startDate)
    const stringEndDate = String(startDate)

    const rental = {
      id: uuidv4(),
      customer: customerId,
      vehicle: vehiclePlate,
      startDate: stringStartDate,
      endDate: stringEndDate,
      rentalDays,
      rentalAmount,
      status
    };

    await rentalRepository.create(rental);
    
    return rental;
  }

  private calculateRentalDays(startDate: Date, endDate: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    // console.log(endDate);
    const diffDays = 3
    // Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay));
    return diffDays + 1;
  }

  private calculateRentalAmount(hourlyRate: number, rentalDays: number, startDate: Date, endDate: Date): number {
    const oneHour = 60 * 60 * 1000;
    const hoursUsed = 2
    // (endDate.getTime() - startDate.getTime()) / oneHour;
    const roundedHours = Math.ceil(hoursUsed);

    return hourlyRate * roundedHours * rentalDays;
  }
}

const rentalReserveService = new RentalReserveService();

export { rentalReserveService };