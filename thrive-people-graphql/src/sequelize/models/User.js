export default function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    isActve: DataTypes.BOOLEAN,
  })

  
  User.sync({force: true}).then(function () {
    // Table created
    User.create({
      email: 'super-admin@thrive-people.com',
      firstName: 'Super',
      lastName: 'Admin',
      isActve: true,
    })
    User.create({
      email: 'user-admin@thrive-people.com',
      firstName: 'User',
      lastName: 'Admin',
      isActve: true,
    })

    User.create({
      email: 'client-admin@thrive-people.com',
      firstName: 'Client',
      lastName: 'Admin',
      isActve: false,
    })

    return User
  })
  
  return User
}

