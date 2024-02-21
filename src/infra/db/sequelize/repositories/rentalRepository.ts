import { IRental, IRentalRepository } from '../../../../app/repositories/rentalRepository';
import { Rental } from '../models/rental';

class RentalRepository implements IRentalRepository {
  async findAll(): Promise<IRental[]> {
    const rentals = await Rental.findAll({
      include: [
        {
          model: Rental,
          attributes: {
            exclude: ['path']
          }
        }
      ]
    });
    return rentals.map(item => {
      return {
        id: item.dataValues.id,
        customer: item.dataValues.customer,
        vehicle: item.dataValues.vehicle,
        startDate: item.dataValues.startDate,
        endDate: item.dataValues.endDate,
        rentalDays: item.dataValues.rentalDays,
        rentalAmount: item.dataValues.rentalAmount,
        status: item.dataValues.status
      }
    });
  }

  async findById(id: string): Promise<IRental | null> {
    const rental = await Rental.findByPk(id);
    if (rental) {
      return {
        id: rental.dataValues.id,
        customer: rental.dataValues.customer,
        vehicle: rental.dataValues.vehicle,
        startDate: rental.dataValues.startDate,
        endDate: rental.dataValues.endDate,
        rentalDays: rental.dataValues.rentalDays,
        rentalAmount: rental.dataValues.rentalAmount,
        status: rental.dataValues.status
      }
    } else {
      return null;
    }
  }

  async findByCustomer(customerId: string): Promise<IRental | null> {
    const rental = await Rental.findByPk(customerId);
    if (rental) {
      return {
        id: rental.dataValues.id,
        customer: rental.dataValues.customer,
        vehicle: rental.dataValues.vehicle,
        startDate: rental.dataValues.startDate,
        endDate: rental.dataValues.endDate,
        rentalDays: rental.dataValues.rentalDays,
        rentalAmount: rental.dataValues.rentalAmount,
        status: rental.dataValues.status
      }
    } else {
      return null;
    }
  }

  async findRentalsByPlate(plate: string): Promise<IRental | null> {
    const rental = await Rental.findByPk(plate);
    if (rental) {
      return {
        id: rental.dataValues.id,
        customer: rental.dataValues.customer,
        vehicle: rental.dataValues.vehicle,
        startDate: rental.dataValues.startDate,
        endDate: rental.dataValues.endDate,
        rentalDays: rental.dataValues.rentalDays,
        rentalAmount: rental.dataValues.rentalAmount,
        status: rental.dataValues.status
      }
    } else {
      return null;
    }
  }

  async create(data: IRental): Promise<void> {
    const rental = await Rental.create({
      id: data.id,
      customer: data.customer,
      vehicle: data.vehicle,
      startDate: data.startDate,
      endDate: data.endDate,
      rentalDays: data.rentalDays,
      rentalAmount: data.rentalAmount,
      status: data.status
    })
    console.log(rental);
  }

  async updateRentalStatus(id: string, newStatus: string): Promise<void> {
    await Rental.update({ status: newStatus }, { where: { id } });
  }

  async updateRentalStartDate(id: string, newStartDate: Date): Promise<void> {
    const rental = await this.findById(id);
    if (rental) {
      (await rental).startDate = newStartDate;
    }
  }

  async updateRentalEndDate(id: string, newEndDate: Date): Promise<void> {
    const rental = await this.findById(id);
    if (rental) {
      (await rental).startDate = newEndDate;
    }
  }

  async isVehicleAvailable(plate: string, startDate: Date, endDate: Date): Promise<boolean> {
    const rental = await this.findRentalsByPlate(plate);
    const overlappingRentals = await this.areDatesOverlapping(startDate, endDate, (await rental).startDate, (await rental).endDate);
    return overlappingRentals === false;
  }

  private async areDatesOverlapping(start1: Date, end1: Date, start2: Date, end2: Date): Promise<boolean> {
    const start = await start1 <= end2 && end1 >= start2;
    return start
  }
}

const rentalRepository = new RentalRepository();

export { rentalRepository };