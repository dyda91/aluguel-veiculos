import { rentalStatusRepository } from "../../../infra/db/sequelize/repositories/rentalStatusRepository";

class RentalStatusFindAllService {
    async findAll() {
        const rentalStatus = await rentalStatusRepository.findAll();
        return rentalStatus
    }
}

const rentalStatusFindAllService = new RentalStatusFindAllService();

export { rentalStatusFindAllService }