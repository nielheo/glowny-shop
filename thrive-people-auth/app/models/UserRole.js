'use strict'

export default function(sequelize, DataTypes) {
  var UserRole = sequelize.define('UserRole', {
    userId: DataTypes.UUID,
    roleId: DataTypes.UUID,
  })

  
  UserRole.sync({force: true})
  
  return UserRole
}

