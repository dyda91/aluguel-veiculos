import { DataTypes } from 'sequelize'
import { sequelize } from '..'

const LicenseCategory = sequelize.define('licenseCategories', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
},
    {
        timestamps: false
    }
);

export { LicenseCategory };