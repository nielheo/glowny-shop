'use strict';
const uuid = require('uuid')

module.exports = {
  up: function (queryInterface, Sequelize) {
    const buffer = new Buffer(32)
    return[ 
      queryInterface
        .createTable('Shops', {
          id: { type: Sequelize.UUID, primaryKey: true },
          code: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          isActive: {
            type: Sequelize.BOOLEAN,
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
        }).done(
          queryInterface
            .addColumn(
              'Users',
              'shopId', {
                type: Sequelize.UUID, 
                allowNull: true,
                references: {
                  model: 'Shops',
                  key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
              }
            )
        )
    ]
  },

  down: function (queryInterface, Sequelize) {
    return
      queryInterface.removeColumn('Users', 'shopId').done(
        queryInterface.dropTable('Shops'))
  }
};
