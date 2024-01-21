import { Rental, RentalStatus } from '../models/Rental';


const rentals: Rental[] = [];

class RentalRepository {
  getAllRentals(): Rental[] {
    return rentals;
  }

  getRentalById(id: number): Rental | undefined {
    return rentals.find((rental) => rental.id === id);
  }

  createRental(newRental: Rental): Rental {
    newRental.status = RentalStatus.PENDING;
    rentals.push(newRental);
    return newRental;
  }

  updateRentalStatus(id: number, newStatus: RentalStatus): void {
    const rental = this.getRentalById(id);
    if (rental) {
      rental.status = newStatus;
    }
  }

  isVehicleAvailable(plate: string, startDate: Date, endDate: Date): boolean {
    const overlappingRentals = rentals.filter(
      (rental) =>
        rental.vehicle.plate === plate &&
        this.areDatesOverlapping(startDate, endDate, rental.startDate, rental.endDate)
    );
    return overlappingRentals.length === 0;
  }

  private areDatesOverlapping(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
    return start1 <= end2 && end1 >= start2;
  }
}

const rentalRepository = new RentalRepository();

export { rentalRepository };
