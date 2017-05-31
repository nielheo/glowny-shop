'use strict'

import expect from 'expect.js'

describe('models/user_shop', function () {
  before(function () {
      return require('../../models').sequelize//.sync()
  })

  beforeEach(function () {
    this.User = require('../../models').User
    this.Role = require('../../models').Role
    this.Shop = require('../../models').Shop
  })

  describe('select user_shops', function () {

    it('select user_shops.userId=Cloth_Super count = 1', function () {
      return this.User.findAll({where: {id: 'Cloth_Super'}}).then(userShop => {
        expect(userShop.length).to.equal(1)
      })
    })

    it('select user_shops.userId=Cloth_Super count = 1', function () {
      return this.User.findAll({
        include: {
				  model: this.Shop,
					where: { code: 'Glowny_Cloth' }
        }}).then(userShop => {
        expect(userShop.length).to.equal(1)
      })
    })
  })
})

