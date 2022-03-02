'use strict';
module.exports = {

    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            companyId: {
                allowNull: false,
                type: Sequelize.INTEGER(11),
                references: {
                    model: 'Companies',
                    key: 'id'
                }
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            surname: {
                allowNull: false,
                type: Sequelize.STRING
            },
            privilege: {
                allowNull: false,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            phoneNumber: {
                allowNull: false,
                type: Sequelize.STRING
            },
            socialNumber: {
                allowNull: false,
                type: Sequelize.STRING
            },
            /*______________________________timestamps_______________________________*/
            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            }
        })
    }, down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};