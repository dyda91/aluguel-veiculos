import { vehicleCategoryRepository } from '../../infra/db/sequelize/repositories/vehicleCategoryRepository';
import { v4 as uuidv4 } from 'uuid';

export interface VehicleCategoryRequest {
    id: string,
    name: string,
}

class VehicleCategoryService {
    async findAll() {
        const vehicleCategories = await vehicleCategoryRepository.findAll();
        return vehicleCategories
    }

    async findById(id: string) {
        const vehicleCategory = await vehicleCategoryRepository.findById(id);
        return vehicleCategory
    }

    async create({
        name,
    }): Promise<VehicleCategoryRequest> {
        const newVehicleCategory = {
            id: uuidv4(),
            name
        };
        await vehicleCategoryRepository.create(newVehicleCategory);
        return newVehicleCategory;
    }
}

const vehicleCategoryService = new VehicleCategoryService();

export { vehicleCategoryService };