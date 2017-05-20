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
    it('select role Admin_Super', function () {
      return this.Role.findOne({ where: { code: 'Admin_Super' }}).then(role => {
        expect(role.code).to.equal('Admin_Super')
        expect(role.title).to.equal('Super Admin')
        expect(role.type).to.equal('admin')
        expect(role.isSuper).to.equal(true)
      })
    })

    it('select role Admin_Client', function () {
      return this.Role.findOne({ where: { code: 'Admin_Client' }}).then(role => {
        expect(role.code).to.equal('Admin_Client')
        expect(role.title).to.equal('Client Admin')
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
  })
})
