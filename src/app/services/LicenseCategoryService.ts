import { licenseCategoryRepository } from '../../infra/db/sequelize/repositories/licenseCategoryRepository';
import { v4 as uuidv4 } from 'uuid';

export interface LicenseCategoryRequest {
    id: string,
    name: string,
}

class LicenseCategoryService {
    async findAll() {
        const licenseCategory = await licenseCategoryRepository.findAll();
        return licenseCategory
    }

    async findById(id: string) {
        const licenseCategory = await licenseCategoryRepository.findById(id);
        return licenseCategory
    }

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

const licenseCategoryService = new LicenseCategoryService();

export { licenseCategoryService };