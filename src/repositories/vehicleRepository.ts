import { Vehicle, VehicleCategory } from '../models/vehicleModel';

class VehicleRepository {
  private vehicles: Vehicle[] = [];

  getAllVehicles(): Vehicle[] {
    return this.vehicles;
  }

  getVehicleByPlate(plate: string): Vehicle | undefined {
    return this.vehicles.find((vehicle) => vehicle.plate === plate);
  }

  createVehicle(vehicleData: { plate: string; manufacturer: string; model: string; year: number; kilometers: number; category: VehicleCategory }): Vehicle {
    const existingVehicle = this.getVehicleByPlate(vehicleData.plate);
    if (existingVehicle) {
      throw new Error('Veículo com placa já cadastrada');
    }

    const newVehicle = new Vehicle(
      vehicleData.plate,
      vehicleData.manufacturer,
      vehicleData.model,
      vehicleData.year,
      vehicleData.kilometers,
      vehicleData.category
    );
    this.vehicles.push(newVehicle);
    return newVehicle;
  }
}

const vehicleRepository = new VehicleRepository();

export { vehicleRepository };
