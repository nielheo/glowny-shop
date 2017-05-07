'use strict'

export default function(sequelize, DataTypes) {
  var UserRole = sequelize.define('UserRole', {
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  })

  
  UserRole.sync({force: true})
  
  return UserRole
}

