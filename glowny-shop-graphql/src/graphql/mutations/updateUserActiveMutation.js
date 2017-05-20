import { GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLInputObjectType } from 'graphql'
import { resolver } from 'graphql-sequelize'
import { userType } from '../types'

var models = require('../../sequelize/models')

const UpdateUserActiveInput = new GraphQLInputObjectType({
  name: 'UpdateUserActiveInput',
  fields: {
    id: {
      description: 'User id',
      type: new GraphQLNonNull(GraphQLString)
    },
    isActive: { 
      description: 'active status',
      type: new GraphQLNonNull(GraphQLBoolean)
    }
  }
})

var updateUserActiveMutation = {
	type: userType,
  args: {
    input: {
      description: 'User id',
      type: new GraphQLNonNull(UpdateUserActiveInput)
    },
  },
  description: 'Update user active status',
  resolve: function(obj, { input }) {
    console.log(input)
    return models.User.update(
      { isActive: input.isActive },
      { where: { id: input.id } }
    ).then(result => {
      return models.User.findById(input.id).then(user => {
        console.log('update user success')
        //response(user).code(200)
        return user
      })
    })
    .catch(err => {}
    )
  }
}

export default updateUserActiveMutation
