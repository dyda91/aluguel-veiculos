import { DataTypes } from "sequelize";
import { sequelize } from "..";
import { VehicleCategory } from "./vehicleCategory";

const Vehicle = sequelize.define('vehicles', {
  plate: {
    type: DataTypes.STRING(7),
    primaryKey: true
  },
  manufacturer: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  model: {
    type: DataTypes.STRING(15),
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
    type: DataTypes.STRING,
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