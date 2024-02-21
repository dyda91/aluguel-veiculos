export interface IRentalStatus {
    id: string,
    status: string
}

export interface IRentalStatusRepository {
    findAll(): Promise<IRentalStatus[]>;
    findById(id: string): Promise<IRentalStatus | null>;
    create(data: IRentalStatus): Promise<void>;
}