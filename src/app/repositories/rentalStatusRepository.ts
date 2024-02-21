export interface IRentalStatus {
    id: string,
    status: string
}

export interface IRentalRepository {
    findById(id: string): Promise<IRentalStatus | null>;
}