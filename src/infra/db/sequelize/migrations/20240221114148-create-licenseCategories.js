'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('licenseCategories', {
      id: {
        type: Sequelize.STRING(36),
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(2),
        allowNull: false,
        unique: true
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('licenseCategories');
  }
};