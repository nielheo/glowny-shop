'use strict'

import expect from 'expect.js'

describe('models/task', function () {
  before(function () {
      return require('../../models').sequelize//.sync()
  })

  beforeEach(function () {
    this.User = require('../../models').User
    this.Role = require('../../models').Role
  })

  describe('select', function () {
    it('select role count = 7', function () {
      return this.Role.findAll().then(roles => {
        expect(roles.length).to.equal(7)
      })
    })

    it('select role.type = admin expect count = 3', function () {
      return this.Role.findAll({ where: { type: 'admin' }}).then(roles => {
        expect(roles.length).to.equal(3)
      })
    })

    it('select role.type = shop expect count = 4', function () {
      return this.Role.findAll({ where: { type: 'shop' }}).then(roles => {
        expect(roles.length).to.equal(4)
      })
    })

    it('select role Admin_Super', function () {
      return this.Role.findOne({ where: { code: 'Admin_Super' }}).then(role => {
        expect(role.code).to.equal('Admin_Super')
        expect(role.title).to.equal('Super Admin')
        expect(role.type).to.equal('admin')
        expect(role.isSuper).to.equal(true)
      })
    })

    it('select role Admin_Shop', function () {
      return this.Role.findOne({ where: { code: 'Admin_Shop' }}).then(role => {
        expect(role.code).to.equal('Admin_Shop')
        expect(role.title).to.equal('Shop Admin')
        expect(role.type).to.equal('admin')
        expect(role.isSuper).to.equal(false)
      })
    })

    it('select role Admin_User', function () {
      return this.Role.findOne({ where: { code: 'Admin_User' }}).then(role => {
        expect(role.code).to.equal('Admin_User')
        expect(role.title).to.equal('User Admin')
        expect(role.type).to.equal('admin')
        expect(role.isSuper).to.equal(false)
      })
    })

    it('select role Shop_Super', function () {
      return this.Role.findOne({ where: { code: 'Shop_Super' }}).then(role => {
        expect(role.code).to.equal('Shop_Super')
        expect(role.title).to.equal('Super Admin')
        expect(role.type).to.equal('shop')
        expect(role.isSuper).to.equal(true)
      })
    })

    it('select role Shop_Product', function () {
      return this.Role.findOne({ where: { code: 'Shop_Product' }}).then(role => {
        expect(role.code).to.equal('Shop_Product')
        expect(role.title).to.equal('Product Admin')
        expect(role.type).to.equal('shop')
        expect(role.isSuper).to.equal(false)
      })
    })

    it('select role Shop_User', function () {
      return this.Role.findOne({ where: { code: 'Shop_User' }}).then(role => {
        expect(role.code).to.equal('Shop_User')
        expect(role.title).to.equal('User Admin')
        expect(role.type).to.equal('shop')
        expect(role.isSuper).to.equal(false)
      })
    })

    it('select role Shop_Seller', function () {
      return this.Role.findOne({ where: { code: 'Shop_Seller' }}).then(role => {
        expect(role.code).to.equal('Shop_Seller')
        expect(role.title).to.equal('Seller')
        expect(role.type).to.equal('shop')
        expect(role.isSuper).to.equal(false)
      })
    })
  })
})
