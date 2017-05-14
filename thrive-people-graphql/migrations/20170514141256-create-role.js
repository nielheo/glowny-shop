'use strict'
const uuid = require('uuid')

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    const buffer = new Buffer(32)
    return[ 
      queryInterface
        .createTable('Roles', {
          id: { type: Sequelize.UUID, primaryKey: true },
          code: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          type: {
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
      queryInterface.bulkInsert('Roles',[{
        id: uuid(),
        code: 'Admin_Super',
        title: 'Super Admin',
        type: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: uuid(),
        code: 'Admin_Client',
        title: 'Client Admin',
        type: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: uuid(),
        code: 'Admin_User',
        title: 'User Admin',
        type: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }])
    ]
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Roles')
  }
};
