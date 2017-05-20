'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.describeTable('Users').done(
      queryInterface
        .createTable('User_Roles', {
          id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
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
          roleId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'Roles',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          }
        }))
    ]
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('User_Roles')
  }
};
