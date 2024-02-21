import { rentalStatusRepository } from '../../infra/db/sequelize/repositories/rentalStatusRepository';
import { v4 as uuidv4 } from 'uuid';

export interface IRentalStatusRequest {
    id: string,
    status: string,
}

class RentalStatusService {
    async findAll() {
        const rentalStatus = await rentalStatusRepository.findAll();
        return rentalStatus
    }

    async findById(id: string) {
        const rentalStatus = await rentalStatusRepository.findById(id);
        return rentalStatus
    }

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

const rentalStatusService = new RentalStatusService();

export { rentalStatusService };