import { GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLInputObjectType,GraphQLList } from 'graphql'
import { resolver } from 'graphql-sequelize'
import { productType } from '../types'
import Bluebird from 'bluebird'

const uuid = require('uuid')

var models = require('../../sequelize/models')

const AddUserInput = new GraphQLInputObjectType({
  name: 'AddUserInput',
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
    
  }
})

var addProductMutation = {
	type: productType,
  args: {
    input: {
      description: 'Add User Input',
      type: new GraphQLNonNull(AddUserInput)
    },
  },
  description: 'Add New User',
  resolve: function(obj, { input }) {
    console.log(input)
    var id =  uuid()
    return models.sequelize.transaction(function (t) {
      return models.Product.create(
      { 
        id: id,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        type: input.type, 
        isActive: true,
        password: 'P@ssw0rd',
      }, {transaction: t})
      .then(result =>
        Bluebird.map(input.roles, function(role) {
          return models.User_Role.create({
            roleId: role,
            userId: result.id
          }, {transaction: t}).then(function() {
            console.log("done");
          }).catch(err => {
            throw new Error()
          })
        })
      )
    }).then(result => {
      return models.User.findById(id).then(user => {
        console.log('add user success')
        //response(user).code(200)
        return user
    }).catch(err => {
      console.log(err)
    })
  })
}}

export default addProductMutation
