import { rentalStatusRepository } from '../../../infra/db/sequelize/repositories/rentalStatusRepository';
import { v4 as uuidv4 } from 'uuid';

export interface IRentalStatusRequest {
    id: string,
    status: string,
}

class RentalStatusCreateService {
    async create({
        status,
    }): Promise<IRentalStatusRequest> {
        const newRentalStatus = {
            id: uuidv4(),
            status
        };
        await rentalStatusRepository.create(newRentalStatus);
        return newRentalStatus;
    }
}

const rentalStatusCreateService = new RentalStatusCreateService();

export { rentalStatusCreateService };