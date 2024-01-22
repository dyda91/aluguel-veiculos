import { Customer } from './Customer';
import { Vehicle } from './Vehicle';

enum RentalStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}


interface Rental {
  id: string;
  customer: Customer;
  vehicle: Vehicle;
  startDate: Date;
  endDate: Date;
  rentalDays: number;
  rentalAmount: number;
  status: RentalStatus;
}

export { Rental, RentalStatus };
