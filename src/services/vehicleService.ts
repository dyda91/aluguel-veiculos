import { vehicleRepository } from '../repositories/vehicleRepository';
import { Vehicle, VehicleCategory } from '../models/vehicleModel';

class VehicleService {


  getAllVehicles() {
    return vehicleRepository.getAllVehicles();
  }

  getVehicleByPlate(plate: string) {
    return vehicleRepository.getVehicleByPlate(plate);
  }

  createVehicle(vehicleData: { plate: string; manufacturer: string; model: string; year: number; kilometers: number; category: VehicleCategory }): Vehicle {
    return vehicleRepository.createVehicle(vehicleData);
  }
}

const vehicleService = new VehicleService();

export { vehicleService };
