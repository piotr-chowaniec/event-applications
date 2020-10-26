'use strict';

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert('Users', [{
    email: 'admin@eventapplications.com',
    firstName: 'John',
    lastName: 'Smith',
    password: 'password',
    salt: 'salt',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: null,
  }]),

  down: async queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
