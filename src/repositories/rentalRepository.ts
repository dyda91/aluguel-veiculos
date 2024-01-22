import { Rental, RentalStatus } from '../models/Rental';

<<<<<<< HEAD
const rentals: Rental[] = [];

=======
>>>>>>> 8cc19a7540bc72c524778beafa96486df285d31d
class RentalRepository {
  private rentals: Rental[] = [];

  getAllRentals(): Rental[] {
    return this.rentals;
  }

  getRentalsByCustomer(customerId: string): Rental[] {
<<<<<<< HEAD
    return rentals.filter((rental) => rental.customer.id === customerId);
  }

  getRentalsByPlate(plate: string): Rental[] {
    return rentals.filter((rental) => rental.vehicle.plate === plate);
  }

  getRentalById(id: string): Rental | undefined {
    return rentals.find((rental) => rental.id === id);
=======
    return this.rentals.filter((rental) => rental.customer.id === customerId);
  }

  getRentalsByPlate(plate: string): Rental[] {
    return this.rentals.filter((rental) => rental.vehicle.plate === plate);
  }

  getRentalById(id: string): Rental | undefined {
    return this.rentals.find((rental) => rental.id === id);
>>>>>>> 8cc19a7540bc72c524778beafa96486df285d31d
  }

  createRental(newRental: Rental): Rental {
    newRental.status = RentalStatus.PENDING;
    this.rentals.push(newRental);
    console.log(newRental)
    return newRental;
  }

  updateRentalStatus(id: string, newStatus: RentalStatus): void {
<<<<<<< HEAD
    const rental = rentals.find((r) => r.id === id);
=======
    const rental = this.rentals.find((r) => r.id === id);
    
>>>>>>> 8cc19a7540bc72c524778beafa96486df285d31d
    if (rental) {
      rental.status = newStatus;
      console.log(rental);
    }
  }

  updateRentalEndDate(id:string, newEndDate: Date): void {
    const rental = this.rentals.find((r) => r.id === id);
    if (rental) {
      rental.endDate = newEndDate;
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
