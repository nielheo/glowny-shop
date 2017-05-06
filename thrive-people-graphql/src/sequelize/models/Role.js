'use strict'

export default function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    title: DataTypes.STRING,
    type: {
      type:   DataTypes.ENUM,
      values: ['admin', 'supplier', 'member']
    }
  })

  Role.sync({force: true}).then(function () {
    // Table created
    Role.create({
      title: 'Super Admin',
      type: 'admin',
    })
    Role.create({
      title: 'User Admin',
      type: 'admin',
    })
    Role.create({
      title: 'Client Admin',
      type: 'admin',
    })

    return Role
  })

  return Role
}
