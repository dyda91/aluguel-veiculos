export interface IRental {
    id: string;
    customer: string;
    vehicle: string;
    startDate: Date;
    endDate: Date;
    rentalDays: number;
    rentalAmount: number;
    status: string;
}

export interface IRentalRepository {
    findAll(): Promise<IRental[]>;
    findById(id: string): Promise<IRental | null>;
    findByCustomer(customerId: string): Promise<IRental | null>;
    findRentalsByPlate(plate: string): Promise<IRental | null>;
    create(data: IRental): Promise<void>;
    updateRentalStatus(id: string, newStatus: string): Promise<void>;
    updateRentalStartDate(id: string, newStartDate: Date): Promise<void>;
    updateRentalEndDate(id: string, newEndDate: Date): Promise<void>;
}