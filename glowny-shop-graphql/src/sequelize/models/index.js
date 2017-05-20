'use strict'
import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '../../..', 'config', 'config.json'))[env]
let sequelize
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL,config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}
var db = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

var User = db['User']
var Role = db['Role']
var UserRole = db['User_Role']

User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })

if (env === 'development') {
  Role.findOrCreate({ 
    defaults: {
      code: 'Admin_Super',
      title: 'Super Admin',
      type: 'admin',
      isSuper: true,
    },
    where: {code: 'Admin_Super'} 
  }).spread((role, created) => {
    console.log('=======================')
    console.log(role.get({
      plain: true
    }))
    console.log(role.id)
    console.log(created)
    if (role) {
      User.findOrCreate({ 
        defaults: {
          email: 'niel.heo@gmail.com',
          firstName: 'Daniel',
          lastName: 'Heo',
          type: 'admin',
          isActive: true,
          password: 'P@ssw0rd',
        },
        where: { email: 'niel.heo@gmail.com' }}).spread((user, created) => {
          console.log(user.id)
          console.log(role.id)
          UserRole.findOrCreate({
            where: { userId: user.id, roleId: role.id },
            default: {
              userId: user.Id, roleId: role.Id
            }
          })
        })
    }
  })
}

if (env === 'test') {
  var User = db['User']
  var Role = db['Role']

  Role.sync({force: true}).then(function () {
    // Table created
    Role.create({
      title: 'Super Admin',
      type: 'admin',
    }).then((role1) => 
      Role.create({
        title: 'User Admin',
        type: 'admin',
      }).then((role2) => 
        Role.create({
          title: 'Client Admin',
          type: 'admin',
        }).then((role3) => {
          User.sync({force: true}).then(function () {
            // Table created
            User.create({
              email: 'super-admin@glowny-shop.com',
              firstName: 'Super',
              lastName: 'Admin',
              password: 'P@ssw0rd_123',
              type: 'admin',
              isActive: true,
            }).then((user1) => {
              user1.setRoles([role1])
            })
            
            
            User.create({
              email: 'user-admin@glowny-shop.com',
              firstName: 'User',
              lastName: 'Admin',
              password: 'P@ssw0rd_123',
              type: 'admin',
              isActive: true,
            }).then((user2) => {
              user2.setRoles([role2])
            })

            User.create({
              email: 'client-admin@glowny-shop.com',
              firstName: 'Client',
              lastName: 'Admin',
              password: 'P@ssw0rd_123',
              type: 'admin',
              isActive: false,
            }).then((user3) => {
              user3.setRoles([role3])
            })

            User.create({
              email: 'daniel@glowny-shop.com',
              firstName: 'Client',
              lastName: 'Admin',
              password: 'P@ssw0rd_123',
              type: 'admin',
              isActive: false,
            }).then((user4) => {
              user4.setRoles([role2,role3])
            })

            return User
          })
        })
      
      
    ))
    

    return Role
  })

} 

module.exports = db
