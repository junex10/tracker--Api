'use strict';

const Constants = require('./constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('actions');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    const items = [
      {
        id: 1,
        main: Constants.SEEDERS.ACTIONS.MAIN,
        module_id: Constants.SEEDERS.MODULES.PROFILE,
        name: 'Ver perfil',
        code: '/profile'
      }
    ];
    return queryInterface.bulkInsert('actions',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
