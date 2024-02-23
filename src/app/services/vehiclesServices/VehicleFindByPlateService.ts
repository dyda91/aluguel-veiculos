import { vehicleRepository } from "../../../infra/db/sequelize/repositories/vehicleRepository";

class VehicleFindByPlateService {
  async findByPlate(plate: string) {
    const vehicle = vehicleRepository.findByPlate(plate);
    return vehicle
  }
}

const vehicleFindByPlateService = new VehicleFindByPlateService();

export { vehicleFindByPlateService }