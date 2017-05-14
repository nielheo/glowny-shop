'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Roles', {
        id: { type: Sequelize.UUID, primaryKey: true },
        title: Sequelize.STRING,
        type: Sequelize.STRING,
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Roles')
  }
};
