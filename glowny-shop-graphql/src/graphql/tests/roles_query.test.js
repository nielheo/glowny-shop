import {tester} from 'graphql-tester'
import expect from 'expect.js'

describe('viewer/roles', () => {
  let test = tester({
      url: 'http://localhost:4000/graphql',
      contentType: 'application/json'
  })

  describe('select', function () {
    it('select roles count is 3', function () {
      return test('{ "query": "{viewer{roles(type:admin){id}}}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.roles.length).to.equal(3)
      })
    })

    it('select roles without type arg, should return error', function () {
      return test('{ "query": "{viewer{roles{id}}}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    it('select roles with invalid type arg, should return error', function () {
      return test('{ "query": "{viewer{roles(type:xxx){id}}}" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })
  })
    
})
