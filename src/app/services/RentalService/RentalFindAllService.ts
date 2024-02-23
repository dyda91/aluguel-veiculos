import { rentalRepository } from "../../../infra/db/sequelize/repositories/rentalRepository";

class RentalFindAllService {
    async findAll() {
        const rental = await rentalRepository.findAll();
        return rental
    }
}

const rentalFindAllService = new RentalFindAllService();

export { rentalFindAllService }