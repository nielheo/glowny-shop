import {tester} from 'graphql-tester'
import expect from 'expect.js'

describe('viewer/products', () => {
  let test = tester({
      url: 'http://localhost:4000/graphql',
      contentType: 'application/graphql'
  })

  describe('product', function () {
    it('update product', function () {
      return test(`'query' : '{mutation { 
                updateProduct(input: 
                  { id:"ID:GC.0001", 
                    sku: "SKU.001", 
                    name: "New Product 1 (Updated)", 
                    description: "Add New Product Mutation (Updated), 
                    curr: "IDR", 
                    price: 850000, 
                    isActive: true, 
                    userId: "User1"
                  }) 
                { id sku name description curr price isActive } }}'`)
      .then(result => {
        console.log(result)
        expect(result.status).to.equal(200)
        expect(result.success).to.equal(true)
        expect(result.data.viewer.products).to.not.be.empty()
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
