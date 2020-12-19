'use strict';

const addDays = days => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@admin.com',
        firstName: 'John',
        lastName: 'Smith',
        password: '$2b$10$A7hvOFdDouuIY/AY.2Y/e.M99SXg/oLmDLr.JSsD02Mf3luPZt6u.',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        email: 'olivia@test.com',
        firstName: 'Olivia',
        lastName: 'Parker',
        password: '$2b$10$oitEuaLdV2diSmhp9BPO6.bXBwQ0Y00LZ0H5eAJ0GNgnFxXIdxaQe',
        role: 'participant',
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        email: 'james@test.com',
        firstName: 'James',
        lastName: 'James',
        password: '$2b$10$oitEuaLdV2diSmhp9BPO6.bXBwQ0Y00LZ0H5eAJ0GNgnFxXIdxaQe',
        role: 'participant',
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        email: 'katie@test.com',
        firstName: 'Katie',
        lastName: 'Katie',
        password: '$2b$10$oitEuaLdV2diSmhp9BPO6.bXBwQ0Y00LZ0H5eAJ0GNgnFxXIdxaQe',
        role: 'participant',
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        email: 'maria@test.com',
        firstName: 'Maria',
        lastName: 'Maria',
        password: '$2b$10$oitEuaLdV2diSmhp9BPO6.bXBwQ0Y00LZ0H5eAJ0GNgnFxXIdxaQe',
        role: 'participant',
        createdAt: new Date(),
        updatedAt: null,
      },
    ]);

    await queryInterface.bulkInsert('applications', [
      {
        userId: 2,
        eventDate: addDays(10),
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        userId: 3,
        eventDate: addDays(3),
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        userId: 4,
        eventDate: addDays(8),
        createdAt: new Date(),
        updatedAt: null,
      },
      {
        userId: 5,
        eventDate: addDays(1),
        createdAt: new Date(),
        updatedAt: null,
      },
    ]);
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('applications', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
