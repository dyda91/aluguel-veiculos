import { Customer } from './customerModel';
import { Vehicle } from './vehicleModel';

enum RentalStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
  }
  

interface Rental {
  id: number;
  customer: Customer;
  vehicle: Vehicle;
  startDate: Date;
  endDate: Date;
  rentalDays: number;
  rentalAmount: number;
  status: RentalStatus;
}

export { Rental, RentalStatus };
