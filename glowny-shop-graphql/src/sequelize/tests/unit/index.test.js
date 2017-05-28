'use strict'
import expect from 'expect.js'

describe('models/index', function () {
  it('returns the role model', function () {
    var models = require('../../models')
    expect(models.Role).to.be.ok()
  })

  it('returns the user model', function () {
    var models = require('../../models')
    expect(models.User).to.be.ok()
  })

  it('returns the shop model', function () {
    var models = require('../../models')
    expect(models.Shop).to.be.ok()
  })

  it('returns the role.users model', function () {
    var models = require('../../models')
    expect(models.Role.Users).to.be.ok()
  })

  it('returns the user.roles model', function () {
    var models = require('../../models')
    expect(models.User.Roles).to.be.ok()
  })

  it('returns the user.shop model', function () {
    var models = require('../../models')
    expect(models.User.Shop).to.be.ok()
  })

  it('returns the shop.users model', function () {
    var models = require('../../models')
    expect(models.Shop.Users).to.be.ok()
  })
})
