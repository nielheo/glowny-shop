'use strict'

import expect from 'expect.js'

describe('models/user_shop', function () {
  before(function () {
      return require('../../models').sequelize//.sync()
  })

  beforeEach(function () {
    this.User = require('../../models').User
    this.Role = require('../../models').Role
    this.UserShop = require('../../models').User_Shop
  })

  describe('select user_shops', function () {
    it('select user_shops count = 1', function () {
      return this.UserShop.findAll().then(userShop => {
        expect(userShop.length).to.equal(1)
      })
    })

    it('select user_shops.userId=Cloth_Super count = 1', function () {
      return this.UserShop.findAll({where: {userId: 'Cloth_Super'}}).then(userShop => {
        expect(userShop.length).to.equal(1)
      })
    })
  })
})
