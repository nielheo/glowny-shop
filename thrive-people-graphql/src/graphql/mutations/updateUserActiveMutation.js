import { GraphQLNonNull, GraphQLInt,GraphQLBoolean} from 'graphql'
import { resolver } from 'graphql-sequelize'
import { userType } from '../types'

var models = require('../../sequelize/models')

var updateUserActiveMutation = {
	type: userType,
  args: {
    id: {
      description: 'User id',
      type: new GraphQLNonNull(GraphQLInt)
    },
    isActive: { 
      description: 'active status',
      type: new GraphQLNonNull(GraphQLBoolean)
    }
  },
  description: 'Creates a new user',
  resolve: function(obj, {id, isActive}) {
    return models.User.update(
      { isActive: isActive },
      { where: { id: id } }
    ).then(result => {
      return models.User.findById(id).then(user => {
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
