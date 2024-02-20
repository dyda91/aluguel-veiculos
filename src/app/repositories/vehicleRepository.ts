export interface IVehicle {
    plate: string;
    manufacturer: string;
    model: string;
    year: number;
    kilometers: number;
    category: string;
    hourlyRate: number;
    isAvailable: boolean;
}

export interface IVehicleRepository {
    findAll(): Promise<IVehicle[]>;
    findByPlate(id: string): Promise<IVehicle | null>;
    create(data: IVehicle): Promise<void>;
    updateVehicleStatus(plate: string, isAvailable: boolean): Promise<void>
}