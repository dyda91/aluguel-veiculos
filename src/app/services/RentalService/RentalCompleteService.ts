import { rentalRepository } from '../../../infra/db/sequelize/repositories/rentalRepository';
import { rentalStatusRepository } from '../../../infra/db/sequelize/repositories/rentalStatusRepository';
import { vehicleRepository } from '../../../infra/db/sequelize/repositories/vehicleRepository';
import { AppError } from '../../errors/AppError';

class RentalCompleteService {
    async completeRental(rentalId: string, endDate: Date, startDate: Date) {
        const rental = await rentalRepository.findById(rentalId);
        const vehicle = await vehicleRepository.findByPlate(rental.vehicle);
        const status = await rentalStatusRepository.findById(rental.status);

        if (status.status !== "ACTIVE") {
            throw new AppError('Somente alugueis ativos podem ser concluídos');
        }

        // const rentalDays = calculateRentalDays(startDate, endDate);
        // const rentalAmount = calculateRentalAmount(vehicle.hourlyRate, rentalDays, startDate, endDate);
        rentalRepository.updateRentalStatus(rentalId, status.status);
        rentalRepository.updateRentalEndDate(rentalId, endDate);
        // rental.rentalDays = rentalDays;
        // rental.rentalAmount = rentalAmount;
        vehicleRepository.updateVehicleStatus(vehicle.plate, true);
    }
}

const rentalCompleteService = new RentalCompleteService();

export { rentalCompleteService }