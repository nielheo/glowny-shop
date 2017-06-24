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

const AddProductInput = new GraphQLInputObjectType({
  name: 'AddProductInput',
  fields: {
    shopCode: {
      description: 'Shop code',
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

var addProductMutation = {
	type: productType,
  args: {
    input: {
      description: 'Add Product Input',
      type: new GraphQLNonNull(AddProductInput)
    },
  },
  description: 'Add New Product',
  resolve: function(obj, { input }) {
    console.log(input)
    var id =  uuid()
    return models.sequelize.transaction(function (t) {
      return models.Shop.findOne({ where: { code: input.shopCode }}).then(shop => {
        if (!shop) {
          throw new Error('Shop code is invalid')
        } else 
        {
          return models.Product.create({  
            id: id,
            shopId: shop.id,
            sku: input.sku,
            name: input.name,
            description: input.description,
            curr: input.curr,
            price: input.price,
            isActive: input.isActive,
            createdBy: input.userId,
            updatedBy: input.userId,
          })
        }
      })
    }).then(result => {
      return models.Product.findById(id).then(product => {
        console.log('add product success')
        return product
      })
    }).catch(error => {
      console.log(error)
      throw new Error(error)
    })
}}

export default addProductMutation

/*
mutation {
  addProduct(input: {shopCode: "Glowny_Cloth", sku: "SKU.001", name: "New Product 1", description: "Add New Product Mutation", curr: "IDR", price: 850000, isActive: true, userId: "User1"}) {
    id
    sku
    name
    description
    curr
    price
    isActive
  }
}*/
