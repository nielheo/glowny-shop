'use strict'

import expect from 'expect.js'

describe('models/user_role', function () {
  before(function () {
      return require('../../models').sequelize//.sync()
  })

  beforeEach(function () {
    this.User = require('../../models').User
    this.Role = require('../../models').Role
    this.UserRole = require('../../models').User_Role
  })

  describe('select user', function () {
    it('select user_roles count = 6', function () {
      return this.UserRole.findAll().then(userRole => {
        expect(userRole.length).to.equal(6)
      })
    })

    it('select user_roles.userId=User1 count = 1', function () {
      return this.UserRole.findAll({where: {userId: 'User1'}}).then(userRole => {
        expect(userRole.length).to.equal(1)
      })
    })

    it('select user_roles.userId=User2 count = 2', function () {
      return this.UserRole.findAll({where: {userId: 'User2'}}).then(userRole => {
        expect(userRole.length).to.equal(2)
      })
    })

    it('select user_roles.userId=Cloth_Super count = 1', function () {
      return this.UserRole.findAll({where: {userId: 'Cloth_Super'}}).then(userRole => {
        expect(userRole.length).to.equal(1)
      })
    })
  })
})
