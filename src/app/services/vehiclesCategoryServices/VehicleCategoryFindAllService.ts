import { vehicleCategoryRepository } from "../../../infra/db/sequelize/repositories/vehicleCategoryRepository";

class VehicleCategoryFindAllService {
    async findAll() {
        const vehicleCategories = await vehicleCategoryRepository.findAll();
        return vehicleCategories
    }
}

const vehicleCategoryFindAllService = new VehicleCategoryFindAllService();

export { vehicleCategoryFindAllService }
