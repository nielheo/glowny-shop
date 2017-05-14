'use strict'

export default function(sequelize, DataTypes) {
  var UserRole = sequelize.define('User_Role', {
    userId: DataTypes.UUID,
    roleId: DataTypes.UUID,
  })
  
  return UserRole
}

