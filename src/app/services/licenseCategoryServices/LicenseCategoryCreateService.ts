import { licenseCategoryRepository } from "../../../infra/db/sequelize/repositories/licenseCategoryRepository";
import { v4 as uuidv4 } from 'uuid';

export interface LicenseCategoryRequest {
    id: string,
    name: string,
}

class LicenseCategoryCreateService {
    async create({
        name,
    }): Promise<LicenseCategoryRequest> {
        const newLicenseCategory = {
            id: uuidv4(),
            name
        };
        await licenseCategoryRepository.create(newLicenseCategory);
        return newLicenseCategory;
    }
}

const licenseCategoryCreateService = new LicenseCategoryCreateService();

export { licenseCategoryCreateService }