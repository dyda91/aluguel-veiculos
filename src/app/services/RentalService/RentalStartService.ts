import { rentalRepository } from "../../../infra/db/sequelize/repositories/rentalRepository";
import { rentalStatusRepository } from "../../../infra/db/sequelize/repositories/rentalStatusRepository";
import { vehicleRepository } from "../../../infra/db/sequelize/repositories/vehicleRepository";
import { AppError } from '../../errors/AppError';

class RentalStartService {
    async startRental(rentalId: string, startDate: Date, endDate: Date) {
        const rental = await rentalRepository.findById(rentalId);
        const vehicle = await vehicleRepository.findByPlate(rental.vehicle);
        const status = await rentalStatusRepository.findById(rental.status);

        if (status.status !== "PENDING") {
            throw new AppError('Status do Aluguel inválido');
        }

        // const rentalDays = calculateRentalDays(startDate, endDate);
        // const rentalAmount = calculateRentalAmount(vehicle.hourlyRate, rentalDays, startDate, endDate);
        rentalRepository.updateRentalStatus(rentalId, rental.status = "1add6108-e979-43d2-9015-e1aa7ec04e84");
        rentalRepository.updateRentalStartDate(rentalId, startDate);
        // rental.rentalDays = rentalDays;
        // rental.rentalAmount = rentalAmount;
        vehicleRepository.updateVehicleStatus(vehicle.plate, false);
    }
}

const rentalStartService = new RentalStartService();

export { rentalStartService }