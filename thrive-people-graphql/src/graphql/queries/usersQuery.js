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
      type: GraphQLString
    },
		type: {
			type: new GraphQLNonNull(siteType)
		},
		first: {
			type: new GraphQLNonNull(GraphQLInt)
		}
  },
	resolve: (_, args) => { 
		return models.User.findAll({ limit: args.first, sort: 'email' })
	}
}

export default usersQuery
