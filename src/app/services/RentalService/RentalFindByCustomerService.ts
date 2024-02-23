import { rentalRepository } from "../../../infra/db/sequelize/repositories/rentalRepository";

class RentalFindByCustomerService {
    async findByCustomer(customerId: string) {
        const costumer = await rentalRepository.findRentalsByCustomer(customerId);
        return costumer
    }
}

const rentalFindByCustomerService = new RentalFindByCustomerService();

export { rentalFindByCustomerService }