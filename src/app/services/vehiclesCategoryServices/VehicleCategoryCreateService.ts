import { vehicleCategoryRepository } from '../../../infra/db/sequelize/repositories/vehicleCategoryRepository';
import { v4 as uuidv4 } from 'uuid';

export interface VehicleCategoryRequest {
    id: string,
    name: string,
}

class VehicleCategoryCreateService {
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

const vehicleCategoryCreateService = new VehicleCategoryCreateService();

export { vehicleCategoryCreateService };