import { ILicenseCategory, ILicenseCategoryRepository } from "../../../../app/repositories/licenseCategoryRepository";
import { LicenseCategory } from "../models/licenseCategory";

class LicenseCategoryRepository implements ILicenseCategoryRepository {
    async findAll(): Promise<ILicenseCategory[]> {
      const licenseCategory = await LicenseCategory.findAll();
      return licenseCategory.map(item => {
        return {
          id: item.dataValues.id,
          name: item.dataValues.name,
        }
      });
    }
  
    async findById(id: string): Promise<ILicenseCategory> {
      const licenseCategory = await LicenseCategory.findByPk(id);
      if (licenseCategory) {
        return {
          id: licenseCategory.dataValues.id,
          name: licenseCategory.dataValues.name,
        };
      } else {
        return null
      }
    }

    async create(data: ILicenseCategory): Promise<void> {
        const licenseCategory = await LicenseCategory.create({
          id: data.id,
          name: data.name,
        });
        console.log(licenseCategory);
    }
}

const licenseCategoryRepository = new LicenseCategoryRepository();

export { licenseCategoryRepository };