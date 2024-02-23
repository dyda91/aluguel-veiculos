import { licenseCategoryRepository } from '../../../infra/db/sequelize/repositories/licenseCategoryRepository';

class LicenseCategoryFindByIdService {    
    async findById(id: string) {
        const licenseCategory = await licenseCategoryRepository.findById(id);
        return licenseCategory
    }
}

const licenseCategoryFindByIdService = new LicenseCategoryFindByIdService();

export { licenseCategoryFindByIdService };