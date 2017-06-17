'use strict'

import expect from 'expect.js'

describe('models/user', function () {
  before(function () {
      return require('../../models').sequelize//.sync()
  })

  beforeEach(function () {
    this.Product = require('../../models').Product
    this.Shop = require('../../models').Shop
    this.Product.belongsTo(this.Shop)
  })

  describe('select product', function () {
    it('select products count = 3', function () {
      return this.Product.findAll().then(product => {
        expect(product.length).to.equal(3)
      })
    })

    it('select user.shop_code=glowny_cloth expect count = 2', function () {
      return this.Product.findAll({ include: [{ model: this.Shop, where : { code: 'glowny_cloth' } }]}).then(product => {
        expect(product.length).to.equal(2)
      })
    })

    it('select user.shop_code=daniel_shop expect count = 1', function () {
      return this.Product.findAll({ include: [{ model: this.Shop, where : { code: 'daniel_shop' } }]}).then(product => {
        expect(product.length).to.equal(1)
      })
    })
  })
})
