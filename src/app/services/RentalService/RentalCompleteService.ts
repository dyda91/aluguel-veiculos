import { rentalRepository } from '../../../infra/db/sequelize/repositories/rentalRepository';
import { rentalStatusRepository } from '../../../infra/db/sequelize/repositories/rentalStatusRepository';
import { vehicleRepository } from '../../../infra/db/sequelize/repositories/vehicleRepository';
import { AppError } from '../../errors/AppError';

class RentalCompleteService {
    async completeRental(rentalId: string, endDate: Date, startDate: Date) {
        try {
            const rental = await rentalRepository.findById(rentalId);
            const vehicle = await vehicleRepository.findByPlate(rental.vehicle);
            const status = await rentalStatusRepository.findById(rental.status);
    
            if (status && status.status !== "ACTIVE") {
                throw new AppError('Somente alugueis ativos podem ser concluídos');
            }
    
            const rentalDays = this.calculateRentalDays(startDate, endDate);
            const rentalAmount = this.calculateRentalAmount(vehicle.hourlyRate, rentalDays, startDate, endDate);
            await rentalRepository.updateRentalStatus(rentalId, "COMPLETED");
            await rentalRepository.updateRentalEndDate(rentalId, endDate);
            rental.rentalDays = rentalDays;
            rental.rentalAmount = rentalAmount;
            await vehicleRepository.updateVehicleStatus(vehicle.plate, true);
        } catch (error) {
            console.error(error);
            throw new AppError('Ocorreu um erro ao completar o aluguel');
        }
    }
    
    private calculateRentalDays(startDate: Date, endDate: Date): number {
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay));
        return diffDays + 1;
    }
    
    private calculateRentalAmount(hourlyRate: number, rentalDays: number, startDate: Date, endDate: Date): number {
        const oneHour = 60 * 60 * 1000;
        const hoursUsed = (endDate.getTime() - startDate.getTime()) / oneHour;
        const roundedHours = Math.ceil(hoursUsed);
    
        return hourlyRate * roundedHours * rentalDays;
    }
}

const rentalCompleteService = new RentalCompleteService();

export { rentalCompleteService }
