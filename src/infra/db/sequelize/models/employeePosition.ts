import { DataTypes } from "sequelize";
import { sequelize } from "..";

const EmployeePosition = sequelize.define('employeePositions', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
},
    {
        timestamps: false
    }
);

export { EmployeePosition };