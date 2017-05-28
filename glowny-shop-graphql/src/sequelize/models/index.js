'use strict'
import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import SeedUserRole from '../models-seed/SeedUserRole'
import SeedUserShop from '../models-seed/SeedUserShop'


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
var UserShop = db['User_Shop']

User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })
User.belongsTo(Shop, { through: UserShop, foreignKey: 'id', otherKey: 'userId' })
Shop.belongsToMany(User, { through: UserShop, foreignKey: 'id', otherKey: 'shopId' })

//User.belongsTo(ShopUser)
//Shop.hasMany(ShopUser)

SeedUserRole(User, Role, UserRole, env)
SeedUserShop(db, env)

module.exports = db
