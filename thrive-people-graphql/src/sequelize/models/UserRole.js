'use strict'
import Sequelize from 'sequelize'
export default function(sequelize, DataTypes) {
  var UserRole = sequelize.define('User_Role', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    userId: DataTypes.UUID,
    roleId: DataTypes.UUID,
  })
  
  return UserRole
}

