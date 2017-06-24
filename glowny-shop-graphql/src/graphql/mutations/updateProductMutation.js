import { 
  GraphQLNonNull, 
  GraphQLString, 
  GraphQLBoolean, 
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLFloat } from 'graphql'
  
import { resolver } from 'graphql-sequelize'
import { productType } from '../types'
import Bluebird from 'bluebird'

const uuid = require('uuid')

var models = require('../../sequelize/models')

const UpdateProductInput = new GraphQLInputObjectType({
  name: 'UpdateProductInput',
  fields: {
    id: {
      description: 'Product id',
      type: new GraphQLNonNull(GraphQLString)
    },
    sku: {
      description: 'SKU',
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      description: 'Product name',
      type: new GraphQLNonNull(GraphQLString)
    },
    description: { 
      description: 'Product description',
      type: new GraphQLNonNull(GraphQLString)
    },
    curr: { 
      description: 'Price currency',
      type: new GraphQLNonNull(GraphQLString)
    },
    price: { 
      description: 'Price currency',
      type: new GraphQLNonNull(GraphQLFloat)
    },
    isActive: { 
      description: 'Put product for sales',
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    userId: {
      description: 'Id of creator',
      type: new GraphQLNonNull(GraphQLString)
    }
  }
})

var updateProductMutation = {
	type: productType,
  args: {
    input: {
      description: 'Update Product Input',
      type: new GraphQLNonNull(UpdateProductInput)
    },
  },
  description: 'Update Product',
  resolve: function(obj, { input }) {
    console.log(input)
    return models.sequelize.transaction(function (t) {
      return models.Product.update(
      { 
        sku: input.sku,
        name: input.name,
        description: input.description,
        curr: input.curr,
        price: input.price,
        isActive: input.isActive,
        updatedBy: input.userId,
      },
      { 
        where: { id: input.id } 
      }
      , {transaction: t})
    }).then(result => {
      return models.Product.findById(input.id).then(product => {
        console.log('update product success')
        //response(user).code(200)
        return product
    }).catch(err => {
      console.log(err)
    })
  })
}}

export default updateProductMutation

/*
mutation {
  updateProduct(input: 
    {
      id:"db5ddd9a-7e2c-4cb8-b551-3b5449e6bc3c",
      sku: "SKU.001", name: "New Product 1 (Updated)", description: "Add New Product Mutation (Updated)", curr: "IDR", price: 850000, isActive: true, userId: "User1"}) {
    id
    sku
    name
    description
    curr
    price
    isActive
  }
}
*/
