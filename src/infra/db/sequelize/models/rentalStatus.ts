import { DataTypes } from "sequelize";
import { sequelize } from "..";

const RentalStatus = sequelize.define('rentalstatuses', {
  id: {
    type: DataTypes.STRING(36),
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
},
  {
    timestamps: false
  }
);

export { RentalStatus };