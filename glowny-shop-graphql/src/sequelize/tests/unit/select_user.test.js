'use strict'

import expect from 'expect.js'

describe('models/user', function () {
  before(function () {
      return require('../../models').sequelize//.sync()
  })

  beforeEach(function () {
    this.User = require('../../models').User
    this.Role = require('../../models').Role
  })

  describe('select user', function () {
    it('select users count = 3', function () {
      return this.User.findAll().then(user => {
        expect(user.length).to.equal(3)
      })
    })

    it('select user.type=admin expect count = 2', function () {
      return this.User.findAll({ where: { type: 'admin' }}).then(user => {
        expect(user.length).to.equal(2)
      })
    })

    it('select user.type=shop expect count = 1', function () {
      return this.User.findAll({ where: { type: 'shop' }}).then(user => {
        expect(user.length).to.equal(1)
      })
    })
  })
})
