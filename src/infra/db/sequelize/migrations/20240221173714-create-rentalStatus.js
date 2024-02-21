'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('rentalstatuses', {
            id: {
                type: Sequelize.STRING(36),
                primaryKey: true
            },
            status: {
                type: Sequelize.STRING(16),
                allowNull: false
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('rentalstatuses');
    }
};