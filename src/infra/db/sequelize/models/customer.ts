import { DataTypes } from 'sequelize'
import { sequelize } from '..'
import { LicenseCategory } from './licenseCategory';

const Customer = sequelize.define('customers', {
  id: {
    type: DataTypes.STRING(36),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  licenseCategory: {
    type: DataTypes.STRING(36),
    references: {
      model: 'licenseCategories',
      key: 'id'
    },
  }
},
  {
    timestamps: false
  }
);

Customer.belongsTo(LicenseCategory, { foreignKey: 'licenseCategory', as: 'customerLicenseCategory'});

export { Customer };