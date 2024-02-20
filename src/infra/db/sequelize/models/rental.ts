import { DataTypes } from "sequelize";
import { sequelize } from "..";
import { RentalStatus } from "./rentalStatus";
import { Customer } from "./customer";
import { Vehicle } from "./vehicle";

const Rental = sequelize.define('rentals', {
  id: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
    references: {
      model: 'rentalStatus',
      key: 'id'
    }
  }

}, 
{
  timestamps: false
}
);

Rental.belongsTo(RentalStatus, { foreignKey: 'status' });
Rental.belongsTo(Customer, { foreignKey: 'customer' });
Rental.belongsTo(Vehicle, { foreignKey: 'vehicle' });

export { Rental };