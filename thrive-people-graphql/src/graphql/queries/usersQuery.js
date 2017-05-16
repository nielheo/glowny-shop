import {GraphQLString,GraphQLList,GraphQLNonNull, GraphQLInt} from 'graphql'
import { resolver } from 'graphql-sequelize'
import { userType } from '../types'
import { siteType } from '../enums'

var models = require('../../sequelize/models')

var usersQuery = {
	type: new GraphQLList(userType),
	//resolve: (_, args) => citiesResolver(args)
	args: {
    id: {
      description: 'id of the user',
      type: GraphQLInt
    },
		type: {
			type: new GraphQLNonNull(siteType)
		}
  },
	resolve: resolver(models.User, {
	//	include: false // disable auto including of associations based on AST - default: true
	})
}

export default usersQuery
