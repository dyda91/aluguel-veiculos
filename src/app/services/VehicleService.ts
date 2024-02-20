import { vehicleRepository } from '../../infra/db/sequelize/repositories/vehicleRepository';
import { Vehicle, VehicleCategory } from '../../infra/db/sequelize/models/vehicle';

class VehicleService {
  getAllVehicles() {
    return vehicleRepository.getAllVehicles();
  }

  getVehicleByPlate(plate: string) {
    return vehicleRepository.getVehicleByPlate(plate);
  }

  createVehicle(vehicleData: {
    plate: string;
    manufacturer: string;
    model: string;
    year: number;
    kilometers: number;
    category: VehicleCategory;
    hourlyRate: number; 
  }): Vehicle {
    const newVehicle = new Vehicle(
      vehicleData.plate,
      vehicleData.manufacturer,
      vehicleData.model,
      vehicleData.year,
      vehicleData.kilometers,
      vehicleData.category,
      vehicleData.hourlyRate
    );
    vehicleRepository.createVehicle(newVehicle);
    return newVehicle;
  }
}

const vehicleService = new VehicleService();

export { vehicleService };