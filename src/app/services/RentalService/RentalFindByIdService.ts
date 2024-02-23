import { rentalRepository } from "../../../infra/db/sequelize/repositories/rentalRepository";

class RentalFindByIdService {
    async findById(rentalId: string) {
        const rental = await rentalRepository.findById(rentalId);
        return rental
    }
}

const rentalFindByIdService = new RentalFindByIdService();

export { rentalFindByIdService }
