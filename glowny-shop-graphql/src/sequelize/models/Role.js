'use strict'
import Sequelize from 'sequelize'
export default function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    type: {
      type:   DataTypes.ENUM,
      values: ['admin', 'supplier', 'member']
    },
    isSuper: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        Role.belongsToMany(models.User, { as: 'Users', through: 'User_Role' });
        // TODO: it seems like there should be a cleaner way to acheive this.
        // assigned the first instance of User.HasMany above to User.Tasks trows and error.
        Role.Users = Role.belongsToMany(models.User, { as: 'Users', through: 'User_Role' });
      }
    }
  })

  return Role
}
