import {GraphQLInt,GraphQLNonNull} from 'graphql'
import { resolver } from 'graphql-sequelize'
import { userType } from '../types'

var models = require('../../sequelize/models')

var userQuery = {
	type: userType,
        // args will automatically be mapped to `where`
  args: {
    id: {
      description: 'id of the user',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: resolver(models.User, {
 //  include: false // disable auto including of associations based on AST - default: true
  })
}

export default userQuery