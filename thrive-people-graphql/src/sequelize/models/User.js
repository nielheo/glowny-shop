export default function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Role)
      },
    },
  })

  return User
}
