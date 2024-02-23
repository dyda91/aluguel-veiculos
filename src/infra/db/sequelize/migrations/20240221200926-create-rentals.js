'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rentals', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true
      },
      customer: {
        type: Sequelize.STRING,
        references: {
          model: 'customers',
          key: 'id'
        }
      },
      vehicle: {
        type: Sequelize.STRING,
        references: {
          model: 'vehicles',
          key: 'plate'
        }
      },
      startDate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      endDate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rentalDays: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rentalAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(36),
        references: {
          model: 'rentalstatuses',
          key: 'id'
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rentals');
  }
};