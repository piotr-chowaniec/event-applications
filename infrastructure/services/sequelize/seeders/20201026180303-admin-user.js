'use strict';

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert('users', [{
    email: 'admin@eventapplications.com',
    firstName: 'John',
    lastName: 'Smith',
    password: '$2b$10$dpUZiLwA/nu4MheIq/SZjubAsAmQALz3xs8V6m916BjUHifvHNd2C',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: null,
  }]),

  down: async queryInterface => queryInterface.bulkDelete('users', null, {}),
};
