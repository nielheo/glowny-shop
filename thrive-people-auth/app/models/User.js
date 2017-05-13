'use strict'
import bcrypt from 'bcrypt'
import Sequelize from 'sequelize'
export default function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    type: {
      type:   DataTypes.ENUM,
      values: ['admin', 'supplier', 'member'],
    },
    isActive: DataTypes.BOOLEAN,
    passwordHash: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
        const salt = bcrypt.genSaltSync(8)
        this.setDataValue('password', val) // Remember to set the data value, otherwise it won't be validated
        this.setDataValue('passwordHash', bcrypt.hashSync(val, salt, null))
      },
      validate: {
          isLongEnough: function (val) {
            if (val.length < 7) {
              throw new Error('Please choose a longer password')
          }
        },
      },
    },
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Role, { as: 'Roles', through: 'UserRole' })
        // TODO: it seems like there should be a cleaner way to acheive this.
        // assigned the first instance of User.HasMany above to User.Tasks trows and error.
        User.Roles = User.belongsToMany(models.Role, { as: 'Roles', through: 'UserRole' })
      },
    },
  })
  
  return User
}
