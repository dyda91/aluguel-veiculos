import { IVehicle, IVehicleRepository } from '../../../../app/repositories/vehicleRepository';
import { Vehicle, } from '../models/vehicle';

class VehicleRepository implements IVehicleRepository {
  async findAll(): Promise<IVehicle[]> {
    const vehicle = await Vehicle.findAll({
      include: [
        {
          model: Vehicle,
          attributes: {
            exclude: ['path']
          }
        }
      ]
    });
    return vehicle.map(item => {
      return {
        plate: item.dataValues.plate,
        manufacturer: item.dataValues.manufacturer,
        model: item.dataValues.model,
        year: item.dataValues.year,
        kilometers: item.dataValues.kilometers,
        category: item.dataValues.category,
        hourlyRate: item.dataValues.hourlyRate,
        isAvailable: item.dataValues.isAvailable
      }
    });
  }

  async findByPlate(vehiclePlate: string): Promise<IVehicle> {
    const vehicle = await Vehicle.findByPk(vehiclePlate);
    if (vehicle) {
      return {
        plate: vehicle.dataValues.plate,
        manufacturer: vehicle.dataValues.manufacturer,
        model: vehicle.dataValues.model,
        year: vehicle.dataValues.year,
        kilometers: vehicle.dataValues.kilometers,
        category: vehicle.dataValues.category,
        hourlyRate: vehicle.dataValues.hourlyRate,
        isAvailable: vehicle.dataValues.isAvailable
      };
    } else {
      return null
    }
  }

  async create(data: IVehicle): Promise<void> {
    const vehicle = await Vehicle.create({
      plate: data.plate,
      manufacturer: data.manufacturer,
      model: data.model,
      year: data.year,
      kilometers: data.kilometers,
      category: data.category,
      hourlyRate: data.hourlyRate,
      isAvailable: data.isAvailable
    });
    console.log(vehicle);
  }

  async updateVehicleStatus(plate: string, isAvailable: boolean): Promise<void> {
    const vehicle = this.findByPlate(plate);
    if (vehicle) {
      (await vehicle).isAvailable = isAvailable;
    }
  }
}

const vehicleRepository = new VehicleRepository();

export { vehicleRepository };