'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('money_movements', {
      id: Constants.PRIMARY_KEY,
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      average: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cash_movements_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cash_movements_type',
          key: 'id'
        }
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
        comment: 'Equal = 0; Up = 1; Down = 2'
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('money_movements');
  }
};
