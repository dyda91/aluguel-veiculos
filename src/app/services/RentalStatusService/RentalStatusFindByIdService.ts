import { rentalStatusRepository } from "../../../infra/db/sequelize/repositories/rentalStatusRepository";

class RentalStatusFindByIdService {
    async findById(id: string) {
        const rentalStatus = await rentalStatusRepository.findById(id);
        return rentalStatus
    }
}

const rentalStatusFindByIdService = new RentalStatusFindByIdService();

export { rentalStatusFindByIdService }