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
var Shop = db['Shop']
var UserRole = db['User_Role']

User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })
//User.belongsTo(ShopUser)
//Shop.hasMany(ShopUser)


if (env === 'development' || env === 'test') {
  Role.findOrCreate({ 
    defaults: {
      code: 'Admin_Super',
      title: 'Super Admin',
      type: 'admin',
      isSuper: true,
    },
    where: {code: 'Admin_Super'} 
  }).spread((role, created) => {
    /*console.log('=======================')
    console.log(role.get({
      plain: true
    }))
    console.log(role.id)
    console.log(created)*/
    if (role) {
      User.findOrCreate({ 
        defaults: {
          id: 'User1',
          email: 'super@glowny-shop.com',
          firstName: 'Daniel',
          lastName: 'Heo',
          type: 'admin',
          isActive: true,
          password: 'P@ssw0rd',
        },
        where: { email: 'super@glowny-shop.com' }}).spread((user, created) => {
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
  Role.findOrCreate({ 
    defaults: {
      code: 'Admin_User',
      title: 'User Admin',
      type: 'admin',
      isSuper: false,
    },
    where: {code: 'Admin_User'} 
  }).spread((adminUser, created) => {
    if (adminUser) {
      Role.findOrCreate({ 
        defaults: {
          code: 'Admin_Shop',
          title: 'Shop Admin',
          type: 'admin',
          isSuper: false,
        },
        where: {code: 'Admin_Shop'} 
      }).spread((adminShop, created) => {
        User.findOrCreate({ 
          defaults: {
            id: 'User2',
            email: 'admin@glowny-shop.com',
            firstName: 'Daniel',
            lastName: 'Heo',
            type: 'admin',
            isActive: true,
            password: 'P@ssw0rd',
          },
          where: { email: 'admin@glowny-shop.com' }}).spread((user, created) => {
            UserRole.findOrCreate({
              where: { userId: user.id, roleId: adminUser.id },
              default: {
                userId: user.Id, roleId: adminUser.Id
              }
            })
            UserRole.findOrCreate({
              where: { userId: user.id, roleId: adminShop.id },
              default: {
                userId: user.Id, roleId: adminShop.Id
              }
            })
          })
      })
    }
  })
}


module.exports = db
