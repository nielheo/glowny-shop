'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.describeTable('Shops').done(
      queryInterface
        .createTable('User_Shops', {
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
          shopId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'Shops',
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
