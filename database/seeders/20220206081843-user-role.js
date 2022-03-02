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
    await queryInterface.bulkInsert('userRoles', [{
      userId: 1,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        userId: 1,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        roleId: 4,
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
