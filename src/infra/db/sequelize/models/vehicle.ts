import { DataTypes } from "sequelize";
import { sequelize } from "..";
import { VehicleCategory } from "./vehicleCategory";
import { NOT } from "sequelize/types/deferrable";

const Vehicle = sequelize.define('vehicles', {
  plate: {
    type: DataTypes.STRING(7),
    primaryKey: true
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  kilometers: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(36),
    references: {
      model: 'vehicleCategories',
      key: 'id'
    }
  },
  hourlyRate: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
},
  {
    timestamps: false
  }
); 

Vehicle.belongsTo(VehicleCategory, { foreignKey: 'category' });

export { Vehicle };