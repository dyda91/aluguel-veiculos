import { rentalRepository } from "../../../infra/db/sequelize/repositories/rentalRepository";

class RentalFindByVehicleService {
    async findRentalsByPlate(plate: string) {
        const rentalPlate = await rentalRepository.findRentalsByPlate(plate);
        return rentalPlate
    }
}

const rentalFindByVehicleService = new RentalFindByVehicleService();

export { rentalFindByVehicleService }