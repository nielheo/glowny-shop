'use strict'
import Sequelize from 'sequelize'
export default function(sequelize, DataTypes) {
  var Shop = sequelize.define('Shop', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {

        Shop.belongsToMany(models.User, { as: 'Users', through: 'User_Shop', foreignKey: 'id', otherKey: 'shopId' });
        // TODO: it seems like there should be a cleaner way to acheive this.
        // assigned the first instance of User.HasMany above to User.Tasks trows and error.
        Shop.Users = Shop.belongsToMany(models.User, { as: 'Users', through: 'User_Shop', foreignKey: 'id', otherKey: 'shopId' });
      }
    }
  })

  return Shop
}
