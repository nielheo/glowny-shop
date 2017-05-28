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
        }),
      queryInterface.bulkInsert('Shops',[{
        id: uuid(),
        code: 'Glowny_Cloth',
        name: 'Glowny Clothing',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }])
    ]
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Shops')
  }
};
