import { vehicleRepository } from '../../infra/db/sequelize/repositories/vehicleRepository';

export interface VehicleRequest {
  plate: string;
  manufacturer: string;
  model: string;
  year: number;
  kilometers: number;
  category: string;
  hourlyRate: number;
  isAvailable: boolean;
}

class VehicleService {
  async findAll() {
    const vehicle = await vehicleRepository.findAll();
    return vehicle
  }

  async findByPlate(plate: string) {
    const vehicle = vehicleRepository.findByPlate(plate);
    return vehicle
  }

  async create({
    plate,
    manufacturer,
    model,
    year,
    kilometers,
    category,
    hourlyRate,
    isAvailable

  }): Promise<VehicleRequest> {
    const newVehicle = {
      plate,
      manufacturer,
      model,
      year,
      kilometers,
      category,
      hourlyRate,
      isAvailable
    };
    await vehicleRepository.create(newVehicle);
    return newVehicle;
  }

}

const vehicleService = new VehicleService();

export { vehicleService };