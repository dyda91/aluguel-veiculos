export interface IVehicleCategory {
    id: string;
    name: string;
}

export interface IVehicleCategoryRepository {
    findAll(): Promise<IVehicleCategory[]>;
    findById(id: string): Promise<IVehicleCategory | null>;
    create(data: IVehicleCategory): Promise<void>;
}