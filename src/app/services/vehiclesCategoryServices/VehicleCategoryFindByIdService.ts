import { vehicleCategoryRepository } from "../../../infra/db/sequelize/repositories/vehicleCategoryRepository";

class VehicleCategoryFindByIdService {
    async findById(id: string) {
        const vehicleCategory = await vehicleCategoryRepository.findById(id);
        return vehicleCategory
    }
}

const vehicleCategoryFindByIdService = new VehicleCategoryFindByIdService();

export { vehicleCategoryFindByIdService }