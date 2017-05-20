import {tester} from 'graphql-tester'
import expect from 'expect.js'

describe('viewer/users', () => {
  let test = tester({
      url: 'http://localhost:4000/graphql',
      contentType: 'application/json'
  })

  describe('select', function () {
    it('select users count is 1', function () {
      return test('{ "query": "{viewer{ users(first:10, type:admin) {  id  firstName  } }}" }')
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
  })
    
})
