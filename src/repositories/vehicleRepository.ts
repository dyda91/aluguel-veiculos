import { Vehicle, VehicleCategory } from '../models/Vehicle';

class VehicleRepository {
  private vehicles: Vehicle[] = [];

  getAllVehicles(): Vehicle[] {
    return this.vehicles;
  }

  getVehicleByPlate(plate: string): Vehicle | undefined {
    return this.vehicles.find((vehicle) => vehicle.plate === plate);
  }

  createVehicle(newVehicle: Vehicle): Vehicle {
    this.vehicles.push(newVehicle);
    console.log(newVehicle);
    return newVehicle
  }

  updateVehicleStatus(plate: string, isAvailable: boolean): void {
    const vehicle = this.getVehicleByPlate(plate);
    if (vehicle) {
      vehicle.isAvailable = isAvailable;
    }
  }
}

const vehicleRepository = new VehicleRepository();

export { vehicleRepository };
