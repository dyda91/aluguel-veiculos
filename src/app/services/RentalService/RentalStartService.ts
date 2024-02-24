import { rentalRepository } from "../../../infra/db/sequelize/repositories/rentalRepository";
import { rentalStatusRepository } from "../../../infra/db/sequelize/repositories/rentalStatusRepository";
import { vehicleRepository } from "../../../infra/db/sequelize/repositories/vehicleRepository";
import { AppError } from '../../errors/AppError';

class RentalStartService {
    async startRental(rentalId: string, startDate: Date) {
        try {
            const rental = await rentalRepository.findById(rentalId);
            if (!rental) {
                throw new Error('Aluguel não encontrado');
            }
        
            const vehicle = await vehicleRepository.findByPlate(rental.vehicle);
        
            if (rental.status !== "PENDING") { 
                throw new AppError('Status do Aluguel inválido');
            }
        
            await rentalRepository.updateRentalStatus(rentalId, "ACTIVE"); 
        
            await rentalRepository.updateRentalStartDate(rentalId, startDate);
        
            await vehicleRepository.updateVehicleStatus(vehicle.plate, false);
        } catch (error) {
            return {
                error: error.message
            };
        }
    }
}

const rentalStartService = new RentalStartService();

export { rentalStartService }
