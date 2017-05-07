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

if (env === 'development') {
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
              email: 'super-admin@thrive-people.com',
              firstName: 'Super',
              lastName: 'Admin',
              password: 'P@ssw0rd_123',
              isActve: true,
            }).then((user1) => {
              user1.setRoles([role1])
            })
            
            
            User.create({
              email: 'user-admin@thrive-people.com',
              firstName: 'User',
              lastName: 'Admin',
              password: 'P@ssw0rd_123',
              isActve: true,
            }).then((user2) => {
              user2.setRoles([role2])
            })

            User.create({
              email: 'client-admin@thrive-people.com',
              firstName: 'Client',
              lastName: 'Admin',
              password: 'P@ssw0rd_123',
              isActve: false,
            }).then((user3) => {
              user3.setRoles([role3])
            })

            User.create({
              email: 'daniel@thrive-people.com',
              firstName: 'Client',
              lastName: 'Admin',
              password: 'P@ssw0rd_123',
              isActve: false,
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

if (env === 'test') {
  var User = db['User']
  var Role = db['Role']

  Role.sync({force: true})
  User.sync({force: true})
}


module.exports = db
