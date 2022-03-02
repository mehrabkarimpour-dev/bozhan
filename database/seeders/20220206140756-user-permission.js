'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert('userPermissions', [

            {
                userId: 1,
                permissionId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 6,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 7,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 8,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 9,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 10,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 11,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 12,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 13,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 1,
                permissionId: 14,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
