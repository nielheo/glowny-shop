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
    it('select users count = 2', function () {
      return this.User.findAll().then(role => {
        expect(role.length).to.equal(2)
      })
    })

  })
})
