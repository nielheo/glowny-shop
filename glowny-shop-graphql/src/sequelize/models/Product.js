'use strict'
import Sequelize from 'sequelize'
export default function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    shopId: Sequelize.UUID,
    sku: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    curr: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(18,4),
      allowNull: false,
    },
    isActive: DataTypes.BOOLEAN,
    createdBy: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    updatedBy: {
      type: Sequelize.UUID,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Product.belongsTo(models.Shop, { as: 'Shop', foreignKey: 'shopId' })
        Product.Shop = Product.belongsTo(models.Shop, { as: 'Shop', foreignKey: 'shopId' })
        
        Product.belongsTo(models.User, { as: 'CreatedUser', foreignKey: 'createdBy' })
        Product.CreatedUser = Product.belongsTo(models.User, { as: 'CreatedUser', foreignKey: 'createdBy' })
        
        Product.belongsTo(models.User, { as: 'UpdatedUser', foreignKey: 'updatedBy' })
        Product.UpdatedUser = Product.belongsTo(models.User, { as: 'UpdatedUser', foreignKey: 'updatedBy' })
        
        // TODO: it seems like there should be a cleaner way to acheive this.
        // assigned the first instance of User.HasMany above to User.Tasks trows and error.
      }
    }
  })

  return Product
}
