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
    type: DataTypes.STRING(36),
    references: {
      model: 'customers',
      key: 'id'
    }
  },
  vehicle: {
    type: DataTypes.STRING(36),
    references: {
      model: 'vehicles',
      key: 'id'
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
    type: DataTypes.NUMBER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(36),
    references: {
      model: 'rentalstatuses',
      key: 'id'
    }
  }

}, 
{
  timestamps: false
}
);

Rental.belongsTo(RentalStatus, { foreignKey: 'status' });
Rental.belongsTo(Customer, { foreignKey: 'customer', as: 'rentalCustomer' });
Rental.belongsTo(Vehicle, { foreignKey: 'vehicle', as: 'rentalVehicle' });

export { Rental };