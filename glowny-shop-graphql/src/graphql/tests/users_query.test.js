import {tester} from 'graphql-tester'
import expect from 'expect.js'

describe('viewer/users', () => {
  let test = tester({
      url: 'http://localhost:4000/graphql',
      contentType: 'application/json'
  })

  describe('select', function () {
    it('select users(type:admin) count is 2', function () {
      return test('{ "query": "{viewer{ users(first:10, type:admin) {  id  firstName  } }}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.users.length).to.equal(2)
      })
    })

    it('select users first:1', function () {
      return test('{ "query": "{viewer{ users(first:1, type:admin) {  id  firstName  } }}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.users.length).to.equal(1)
      })
    })

    it('select roles without type type arg, should return error', function () {
      return test('{ "query": "{viewer{ users(first:10) {  id  firstName  } }}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    it('select roles without first type arg, should return error', function () {
      return test('{ "query": "{viewer{ users(type:admin) {  id  firstName  } }}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    it('select roles with invalid first arg, should return error', function () {
      return test('{ "query": "{viewer{ users(first:xxx) {  id  firstName  } }}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    it('select roles with invalid type arg, should return error', function () {
      return test('{ "query": "{viewer{ users(type:xxx) {  id  firstName  } }}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    it('select users with roles', function () {
      return test('{ "query": "{viewer{ users(first:10, type:admin) {  id  firstName roles { code } } }}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.users.length).to.equal(2)
        expect(result.data.viewer.users[0].roles.length).not.to.equal(0)
        expect(result.data.viewer.users[1].roles.length).not.to.equal(0)
      })
    })

    it('select user id:User1', function () {
      return test('{ "query": "{viewer{ users(first:5, type:admin, id:\\"User1\\") { id email roles { code }  } }}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.users.length).to.equal(1)
        expect(result.data.viewer.users[0].email).to.equal("super@glowny-shop.com")
        expect(result.data.viewer.users[0].roles.length).to.equal(1)
      })
    })

    it('select user id:User2', function () {
      return test('{ "query": "{viewer{ users(first:10, type:admin, id:\\"User2\\") { id email roles { code } } }}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.users.length).to.equal(1)
        expect(result.data.viewer.users[0].roles.length).to.equal(2)
      })
    })

    it('select users(type=shop) count is 1', function () {
      return test('{ "query": "{viewer{ users(first:10, type:shop) {  id  firstName  } }}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.users.length).to.equal(1)
      })
    })
  })
    
})
