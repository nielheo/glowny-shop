import {tester} from 'graphql-tester'
import expect from 'expect.js'

describe('viewer/shops', () => {
  let test = tester({
      url: 'http://localhost:4000/graphql',
      contentType: 'application/json'
  })

  describe('select', function () {
    it('select shops(code:glowny_cloth) count is 1', function () {
      return test('{ "query": "{viewer{ shops (code:\\"glowny_cloth\\") {  id  } }}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.shops.length).to.equal(1)
      })
    })

    it('select shops(code:daniel_shop) count is 1', function () {
      return test('{ "query": "{viewer{ shops (code:\\"daniel_shop\\") {  id  } }}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.shops.length).to.equal(1)
      })
    })

    it('select shops(code:xxxxxx) count is 0', function () {
      return test('{ "query": "{viewer{ shops (code:\\"xxxxxx\\") {  id  } }}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.shops.length).to.equal(0)
      })
    })

    it('select shops with no args return an error', function () {
      return test('{ "query": "{ viewer { shops {  id  } } }" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    it('select users first:1 - return all expected fields', function () {
      return test('{ "query": "{viewer{ shops (code:\\"glowny_cloth\\") {  id code name systemCurr isActive } }}" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.shops.length).to.equal(1)
        expect(result.data.viewer.shops[0].id).to.not.be.empty()
        expect(result.data.viewer.shops[0].code).to.not.be.empty()
        expect(result.data.viewer.shops[0].name).to.not.be.empty()
        expect(result.data.viewer.shops[0].systemCurr).to.not.be.empty()
        expect(result.data.viewer.shops[0].isActive).to.be.ok()
      })
    })
  })
    
})
