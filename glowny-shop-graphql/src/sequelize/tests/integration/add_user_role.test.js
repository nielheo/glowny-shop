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

  describe('create', function () {
    it('creates a user', function () {
      return this.User.create({ 
        email: 'johndoe@test.com',
        firstName: 'John',
        lastName: 'Doe',
        type: 'admin',
        isActive: true,
        password: 'aaaaaaaaaa'
      }).then(user => {
        expect(user.email).to.equal('johndoe@test.com')
        expect(user.firstName).to.equal('John')
        expect(user.lastName).to.equal('Doe')
        expect(user.type).to.equal('admin')
        expect(user.isActive).to.equal(true)
        this.User.destroy({ where : { id: user.id }})
      })
    })
    it('creates a role', function () {
      return this.Role.create({ 
        code: 'test_admin',
        title: 'Test Admin',
        type: 'admin',
        isSuper: true,
      }).then(role => {
        expect(role.code).to.equal('test_admin')
        expect(role.title).to.equal('Test Admin')
        expect(role.type).to.equal('admin')
        expect(role.isSuper).to.equal(true)
        this.Role.destroy({ where : { id: role.id }})
      })
    })
  })
})
