import {tester} from 'graphql-tester'
import expect from 'expect.js'

describe('viewer/products', () => {
  let test = tester({
      url: 'http://localhost:4000/graphql',
      contentType: 'application/json'
  })

  describe('select', function () {
    it('select products count is 2', function () {
      return test('{ "query": "{ viewer { products(shopCode:\\"glowny_cloth\\") { id } } }" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.products.length).to.equal(2)
      })
    })

    it('select products count is 1', function () {
      return test('{ "query": "{ viewer { products(shopCode:\\"daniel_shop\\") { id } } }" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.products.length).to.equal(1)
      })
    })

    it('select roles without shopCode arg, should return error', function () {
      return test('{ "query": "{ viewer { products { id } } }" }')
      .then(result => {
        expect(result.status).to.equal(400)
        expect(result.success).to.equal(false)
      })
    })

    it('select users first:1 - return all expected fields', function () {
      return test('{ "query": "{ viewer { products(shopCode:\\"glowny_cloth\\") { id sku name description curr price } } }" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.products).to.be.an('array')
        expect(result.data.viewer.products[0].id).to.not.be.empty()
        expect(result.data.viewer.products[0].sku).to.not.be.empty()
        expect(result.data.viewer.products[0].name).to.not.be.empty()
        expect(result.data.viewer.products[0].description).to.not.be.empty()
        expect(result.data.viewer.products[0].curr).to.be('THB')
        expect(result.data.viewer.products[0].price).to.be.a('number')
      })
    })

    it('select users first:1 - return all expected fields', function () {
      return test('{ "query": "{ viewer { products(shopCode:\\"daniel_shop\\") { id sku name description curr price } } }" }')
      .then(result => {
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.products).to.be.an('array')
        expect(result.data.viewer.products[0].id).to.not.be.empty()
        expect(result.data.viewer.products[0].sku).to.not.be.empty()
        expect(result.data.viewer.products[0].name).to.not.be.empty()
        expect(result.data.viewer.products[0].description).to.not.be.empty()
        expect(result.data.viewer.products[0].curr).to.be('IDR')
        expect(result.data.viewer.products[0].price).to.be.a('number')
      })
    })
  })
    
})
