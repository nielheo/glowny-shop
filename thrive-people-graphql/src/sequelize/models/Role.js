'use strict'

export default function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    title: DataTypes.STRING,
    type: {
      type:   DataTypes.ENUM,
      values: ['admin', 'supplier', 'member']
    }
  })

  return Role
}
