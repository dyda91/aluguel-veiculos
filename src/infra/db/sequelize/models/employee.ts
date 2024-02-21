import { DataTypes } from "sequelize";
import { sequelize } from "..";
import { LicenseCategory } from "./licenseCategory";
import { EmployeePosition } from "./employeePosition";

const Employee = sequelize.define('employees', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    licenseCategory: {
        type: DataTypes.STRING(2),
        references: {
            model: 'licenseCategories',
            key: 'id'
        }
    },
    position: {
        type: DataTypes.STRING(20),
        references: {
            model: 'employeePositions',
            key: 'id'
        }
    }
},
    {
        timestamps: false
    }
);

Employee.belongsTo(LicenseCategory, { foreignKey: 'licenseCategory' });
Employee.belongsTo(EmployeePosition, { foreignKey: 'position' });

export { Employee };