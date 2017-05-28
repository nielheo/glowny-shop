'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.describeTable('Users').done(
      queryInterface
        .createTable('User_Shops', {
          userId: { 
            type: Sequelize.UUID, 
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          shopId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'Roles',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          }
        }))
    ]
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('User_Shops')
  }
};
