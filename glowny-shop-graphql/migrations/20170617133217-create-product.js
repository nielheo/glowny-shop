'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const buffer = new Buffer(32)
    return[ 
      queryInterface
        .createTable('Products', {
          id: { 
            type: Sequelize.UUID, 
            primaryKey: true 
          },
          shopId: {
            type: Sequelize.UUID, 
            allowNull: true,
            references: {
              model: 'Shops',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          sku: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          price: {
            type: Sequelize.DECIMAL(18,4),
            allowNull: false,
          },
          isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
          },
          createdBy: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          updatedBy: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'Users',
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
        }).done(
          queryInterface.addIndex(
            'Products',
            ['shopId', 'sku'],
            {
              indexName: 'ProductSkuUniqueIndex',
              indicesType: 'UNIQUE'
            }
          ))
    ]
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Products')
  }
};
