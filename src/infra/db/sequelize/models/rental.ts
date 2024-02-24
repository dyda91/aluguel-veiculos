import { DataTypes } from "sequelize";
import { sequelize } from "..";
import { RentalStatus } from "./rentalStatus";
import { Customer } from "./customer";
import { Vehicle } from "./vehicle";

const Rental = sequelize.define('rentals', {
  id: {
    type: DataTypes.STRING(36),
    primaryKey: true
  },
  customer: {
    type: DataTypes.STRING,
    references: {
      model: 'customers',
      key: 'id'
    }
  },
  vehicle: {
    type: DataTypes.STRING,
    references: {
      model: 'vehicles',
      key: 'plate'
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  rentalDays: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  rentalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(36),
    references: {
      model: 'rentalstatuses',
      key: 'status'
    }
  }

}, 
{
  timestamps: false
}
);

Rental.belongsTo(RentalStatus, { foreignKey: 'status', as: 'rentalStatus'});
Rental.belongsTo(Customer, { foreignKey: 'customer', as: 'rentalCustomer' });
Rental.belongsTo(Vehicle, { foreignKey: 'vehicle', as: 'rentalVehicle' });

export { Rental };