import { DataTypes } from "sequelize";
import { sequelize } from "..";

const VehicleCategory = sequelize.define('vehicleCategories', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
},
    {
        timestamps: false
    }
);

export { VehicleCategory }