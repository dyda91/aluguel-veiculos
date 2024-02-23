import { vehicleRepository } from "../../../infra/db/sequelize/repositories/vehicleRepository";

class VehicleFindAllService {
    async findAll() {
        const vehicle = await vehicleRepository.findAll();
        return vehicle
    }
}

const vehicleFindAllService = new VehicleFindAllService();

export { vehicleFindAllService }