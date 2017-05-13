'use strict'

export default function(sequelize, DataTypes) {
  var UserRole = sequelize.define('UserRole', {
    userId: DataTypes.UUID,
    roleId: DataTypes.UUID,
  })
  
  return UserRole
}

