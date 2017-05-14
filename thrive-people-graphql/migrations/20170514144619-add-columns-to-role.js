'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'Roles',
        'createdAt',
        {
          type: Sequelize.DATE,
          allowNull: false,
        }
      ),

      queryInterface.addColumn(
        'Roles',
        'updatedAt',
        {
          type: Sequelize.DATE,
          allowNull: false,
        }
      )
    ]
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Roles', 'createdAt'),
      queryInterface.removeColumn('Roles', 'updatedAt')
    ]
  }
};
