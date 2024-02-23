import { licenseCategoryRepository } from "../../../infra/db/sequelize/repositories/licenseCategoryRepository";

class LicenseCategoryFindAllService {
    async findAll() {
        const licenseCategory = await licenseCategoryRepository.findAll();
        return licenseCategory
    }
}

const licenseCategoryFindAllService = new LicenseCategoryFindAllService();

export { licenseCategoryFindAllService }