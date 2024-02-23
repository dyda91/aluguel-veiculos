import { rentalRepository } from '../../infra/db/sequelize/repositories/rentalRepository';
import { vehicleRepository } from '../../infra/db/sequelize/repositories/vehicleRepository';
import { customerRepository } from '../../infra/db/sequelize/repositories/customerRepository';
import { VehicleRequest } from './VehicleService';
import { CustomerRequest } from './CustomerService';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../errors/AppError';
import { rentalStatusRepository } from '../../infra/db/sequelize/repositories/rentalStatusRepository';


class RentalService {
  async findAll() {
    const rental = await rentalRepository.findAll();
    return rental
  }

  async findByCustomer(customerId: string) {
    const costumer = await rentalRepository.findRentalsByCustomer(customerId);
    return costumer
  }

  async findRentalsByPlate(plate: string) {
    const rentalPlate = await rentalRepository.findRentalsByPlate(plate);
    return rentalPlate
  }

  async findById(rentalId: string) {
    const rental = await rentalRepository.findById(rentalId);
    return rental
  }

  async create(customer: CustomerRequest, vehicle: VehicleRequest, startDate: Date, endDate: Date, status: string) {
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

  async startRental(rentalId: string, startDate: Date, endDate: Date) {
    const rental = await rentalRepository.findById(rentalId);
    const vehicle = await vehicleRepository.findByPlate(rental.vehicle);
    const status = await rentalStatusRepository.findById(rental.status);

    if (status.status !== "PENDING") {
      throw new AppError('Status do Aluguel inválido');
    }

    const rentalDays = this.calculateRentalDays(startDate, endDate);
    const rentalAmount = this.calculateRentalAmount(vehicle.hourlyRate, rentalDays, startDate, endDate);
    rentalRepository.updateRentalStatus(rentalId, rental.status = "1add6108-e979-43d2-9015-e1aa7ec04e84");
    rentalRepository.updateRentalStartDate(rentalId, startDate);
    rental.rentalDays = rentalDays;
    rental.rentalAmount = rentalAmount;
    vehicleRepository.updateVehicleStatus(vehicle.plate, false);
  }

  async completeRental(rentalId: string, endDate: Date, startDate: Date) {
    const rental = await rentalRepository.findById(rentalId);
    const vehicle = await vehicleRepository.findByPlate(rental.vehicle);
    const status = await rentalStatusRepository.findById(rental.status);

    if (status.status !== "ACTIVE") {
      throw new AppError('Somente alugueis ativos podem ser concluídos');
    }

    const rentalDays = this.calculateRentalDays(startDate, endDate);
    const rentalAmount = this.calculateRentalAmount(vehicle.hourlyRate, rentalDays, startDate, endDate);
    rentalRepository.updateRentalStatus(rentalId, status.status);
    rentalRepository.updateRentalEndDate(rentalId, endDate);
    rental.rentalDays = rentalDays;
    rental.rentalAmount = rentalAmount;
    vehicleRepository.updateVehicleStatus(vehicle.plate, true);
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

const rentalService = new RentalService();

export { rentalService };