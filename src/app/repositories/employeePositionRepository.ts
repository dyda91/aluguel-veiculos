export interface IEmployeePosition {
    id: string;
    name: string;
}

export interface IEmployeePositionRepository {
    findAll(): Promise<IEmployeePosition[]>;
    findById(id: string): Promise<IEmployeePosition | null>;
    create(data: IEmployeePosition): Promise<void>;
}