import { vehicleRepository } from "../../../infra/db/sequelize/repositories/vehicleRepository";

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

class VehicleCreateService {
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

const vehicleCreateService = new VehicleCreateService();

export { vehicleCreateService };