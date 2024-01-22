import { Rental, RentalStatus } from '../models/Rental';

class RentalRepository {
  private rentals: Rental[] = [];

  getAllRentals(): Rental[] {
    return this.rentals;
  }

  getRentalsByCustomer(customerId: string): Rental[] {
    return this.rentals.filter((rental) => rental.customer.id === customerId);
  }

  getRentalsByPlate(plate: string): Rental[] {
    return this.rentals.filter((rental) => rental.vehicle.plate === plate);
  }

  getRentalById(id: string): Rental | undefined {
    return this.rentals.find((rental) => rental.id === id);
  }

  createRental(newRental: Rental): Rental {
    newRental.status = RentalStatus.PENDING;
    this.rentals.push(newRental);
    console.log(newRental)
    return newRental;
  }

  updateRentalStatus(id: string, newStatus: RentalStatus): void {
    const rental = this.rentals.find((r) => r.id === id);
    if (rental) {
      rental.status = newStatus;
    }
  }

  isVehicleAvailable(plate: string, startDate: Date, endDate: Date): boolean {
    const overlappingRentals = this.rentals.filter(
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
