'use strict'
import Sequelize from 'sequelize'
export default function(sequelize, DataTypes) {
  var Shop = sequelize.define('Shop', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    systemCurr: DataTypes.STRING(3),
    isActive: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {

        Shop.hasMany(models.User, { as: 'Users' });
        Shop.hasMany(models.Product, { as: 'Products' });
        
        // TODO: it seems like there should be a cleaner way to acheive this.
        // assigned the first instance of User.HasMany above to User.Tasks trows and error.
        Shop.Users = Shop.hasMany(models.User, { as: 'Users' });
        Shop.Products = Shop.hasMany(models.Product, { as: 'Products' });
      }
    }
  })

  return Shop
}
