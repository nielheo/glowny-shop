'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface
        .createTable('User_Roles', {
          id: {
            type: Sequelize.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
          },
          userId: { 
            type: Sequelize.UUID, 
            allowNull: false,
          },
          roleId: {
            type: Sequelize.UUID,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          }
        }),
    ]
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('User_Roles')
  }
};
