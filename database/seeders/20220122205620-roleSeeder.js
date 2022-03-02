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
        await queryInterface.bulkInsert('roles', [
            {
                key: 'admin',
                title: 'ادمین',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: 'manager',
                title: 'مدیر',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: 'guard',
                title: 'نگهبان',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                key: 'viewer',
                title: 'نظاره گر',
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
