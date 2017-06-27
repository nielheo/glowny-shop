import { GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLInputObjectType } from 'graphql'
import { resolver } from 'graphql-sequelize'
import { productType } from '../types'

var models = require('../../sequelize/models')

const UpdateProductActiveInput = new GraphQLInputObjectType({
  name: 'UpdateProductActiveInput',
  fields: {
    id: {
      description: 'Product id',
      type: new GraphQLNonNull(GraphQLString)
    },
    isActive: { 
      description: 'active status',
      type: new GraphQLNonNull(GraphQLBoolean)
    }
  }
})

var updateProductActiveMutation = {
	type: productType,
  args: {
    input: {
      description: 'Product id',
      type: new GraphQLNonNull(UpdateProductActiveInput)
    },
  },
  description: 'Update user active status',
  resolve: function(obj, { input }) {
    console.log(input)
    return models.Product.update(
      { isActive: input.isActive },
      { where: { id: input.id } }
    ).then(result => {
      return models.Product.findById(input.id).then(product => {
        console.log('update product success')
        //response(user).code(200)
        return product
      })
    })
    .catch(err => {}
    )
  }
}

export default updateProductActiveMutation
