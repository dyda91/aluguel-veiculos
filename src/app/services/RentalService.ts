
import { rentalRepository } from '../../infra/db/sequelize/repositories/rentalRepository';
import { vehicleRepository } from '../../infra/db/sequelize/repositories/vehicleRepository';
import { customerRepository } from '../../infra/db/sequelize/repositories/customerRepository';
import { VehicleRequest } from './VehicleService';
import { CustomerRequest } from './CustomerService';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../errors/AppError';


class RentalService {
  async findAll() {
    const rental = await rentalRepository.findAll();
    return rental
  }

  async findByCustomer(customerId: string) {
    const costumer = await rentalRepository.findByCustomer(customerId);
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

  async create(customer: CustomerRequest, vehicle: VehicleRequest, startDate: Date, endDate: Date) {
    const existingCustomer = customerRepository.findById((await customer).id);
    const existingVehicle = vehicleRepository.findByPlate(vehicle.plate);
    const isVehicleAvailable = rentalRepository.isVehicleAvailable((await existingVehicle).plate, startDate, endDate);

    if (!existingCustomer) {
      throw new AppError('Cliente não encontrado');
    }

    if (!existingVehicle) {
      throw new AppError('Veículo não encontrado');
    }
    
    if (!isVehicleAvailable) {
      throw new AppError('Veículo não disponível para o período');
    }

    const rentalDays = this.calculateRentalDays(startDate, endDate);
    const rentalAmount = this.calculateRentalAmount((await existingVehicle).hourlyRate, rentalDays, startDate, endDate);

    const rental = {
      id: uuidv4(),
      customer: existingCustomer,
      vehicle: existingVehicle,
      startDate,
      endDate,
      rentalDays,
      rentalAmount,
      status: "PENDING"
    };

    await rentalRepository.create(rental);

    return rental;
  }

  async startRental(rentalId: string, startDate: Date) {
    const rental = await rentalRepository.findById(rentalId);

    if ((await rental).status !== "PENDING") {
      throw new AppError('Status do Aluguel inválido');
    }

    const rentalDays = this.calculateRentalDays(startDate, rental.endDate);
    const rentalAmount = this.calculateRentalAmount((await rental.vehicle).hourlyRate, rentalDays, startDate, rental.endDate);
    rentalRepository.updateRentalStatus(rentalId, (await rental).status="ACTIVE");
    rentalRepository.updateRentalStartDate(rentalId, startDate);
    rental.rentalDays = rentalDays;
    rental.rentalAmount = rentalAmount;
    vehicleRepository.updateVehicleStatus((await rental.vehicle).plate, false);
  }

  async completeRental(rentalId: string, endDate: Date) {
    const rental = await rentalRepository.findById(rentalId);

    if ((await rental).status !== "ACTIVE") {
      throw new AppError('Somente alugueis ativos podem ser concluídos');
    }

    const rentalDays = this.calculateRentalDays((await rental).startDate, endDate);
    const rentalAmount = this.calculateRentalAmount((await rental.vehicle).hourlyRate, rentalDays, (await rental).startDate, endDate);
    rentalRepository.updateRentalStatus(rentalId, "COMPLETED");
    rentalRepository.updateRentalEndDate(rentalId, endDate);
    (await rental).rentalDays = rentalDays;
    (await rental).rentalAmount = rentalAmount;
    vehicleRepository.updateVehicleStatus((await rental.vehicle).plate, true);
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