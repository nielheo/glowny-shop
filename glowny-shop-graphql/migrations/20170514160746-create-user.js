'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const buffer = new Buffer(32)
    return[ 
      queryInterface
        .createTable('Users', {
          id: { 
            type: Sequelize.UUID, 
            primaryKey: true 
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          firstName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          lastName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          type: {
            type:   Sequelize.ENUM,
            values: ['admin', 'shop', 'member'],
            allowNull: false,
          },
          isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
          },
          passwordHash: {
            type: Sequelize.STRING,
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
      queryInterface.addIndex(
        'Users',
        ['email'],
        {
          indexName: 'UserEmailUniqueIndex',
          indicesType: 'UNIQUE'
        }
      )
    ]
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Users')
  }
};
