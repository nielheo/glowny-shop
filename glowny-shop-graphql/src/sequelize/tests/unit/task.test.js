'use strict'

import expect from 'expect.js'

describe('models/task', function () {
  before(function () {
      return require('../../models').sequelize.sync()
  })

  beforeEach(function () {
    this.User = require('../../models').User
    this.Role = require('../../models').Role
  })

  describe('create', function () {
    it('creates a task', function () {
      return this.User.create({ username: 'johndoe' }).bind(this).then(function (user) {
        return this.Role.create({ title: 'a title', UserId: user.id }).then(function (task) {
          expect(task.title).to.equal('a title')
        })
      })
    })
  })
})
