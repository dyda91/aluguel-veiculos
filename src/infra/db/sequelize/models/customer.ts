import { DataTypes } from 'sequelize'
import { sequelize } from '..'
import { LicenseCategory } from './licenseCategory';

const Customer = sequelize.define('customers', {
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
    },
  }
},
  {
    timestamps: false
  }
);

Customer.belongsTo(LicenseCategory, { foreignKey: 'licenseCategory'});

export { Customer };