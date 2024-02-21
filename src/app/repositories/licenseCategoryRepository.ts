export interface ILicenseCategory {
    id: string;
    name: string;
}

export interface ILicenseCategoryRepository {
    findAll(): Promise<ILicenseCategory[]>;
    findById(id: string): Promise<ILicenseCategory | null>;
    create(data: ILicenseCategory): Promise<void>;
}