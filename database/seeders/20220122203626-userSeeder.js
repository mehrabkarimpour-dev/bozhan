'use strict';
const crypto = require('crypto')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         */
        await queryInterface.bulkInsert('users', [
            {
                organizationId: 1,
                mobile: '09180131109',
                password: crypto.createHash('sha256').update('121212').digest('hex'),
                firstName: 'mehrab',
                lastName: 'karimpour',
                email: 'mehrab@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date()
            }
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
