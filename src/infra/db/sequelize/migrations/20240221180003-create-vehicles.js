'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicles', {
      plate: {
        type: Sequelize.STRING(7),
        primaryKey: true
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      kilometers: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING(36),
        references: {
          model: 'vehicleCategories',
          key: 'id'
        }
      },
      hourlyRate: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vehicles');
  }
};