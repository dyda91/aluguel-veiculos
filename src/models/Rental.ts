import { Customer } from './Customer';
import { Vehicle } from './Vehicle';

enum RentalStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

class Rental {
  
  id: string;
  customer: Customer;
  vehicle: Vehicle;
  startDate: Date;
  endDate: Date;
  rentalDays: number;
  rentalAmount: number;
  status: RentalStatus;

  constructor(
    id: string,
    customer: Customer,
    vehicle: Vehicle,
    startDate: Date,
    endDate: Date,
    rentalDays: number,
    rentalAmount: number,
    status: RentalStatus
  ) {
    this.id = id;
    this.customer = customer;
    this.vehicle = vehicle;
    this.startDate = startDate;
    this.endDate = endDate;
    this.rentalDays = rentalDays;
    this.rentalAmount = rentalAmount;
    this.status = status
  }
}

export { Rental, RentalStatus };
