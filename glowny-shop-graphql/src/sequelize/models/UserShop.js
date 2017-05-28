'use strict'
import Sequelize from 'sequelize'
export default function(sequelize, DataTypes) {
  var UserShop = sequelize.define('User_Shop', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    userId: DataTypes.UUID,
    shopId: DataTypes.UUID,
  }, {
    createdAt: false,
    updatedAt: false,
  })
  
  return UserShop
}

