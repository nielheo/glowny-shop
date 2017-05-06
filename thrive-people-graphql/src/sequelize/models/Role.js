'use strict'

export default function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    title: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User)
        Role.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false,
          },
        })
      },
    },
  })

  return Role
}
