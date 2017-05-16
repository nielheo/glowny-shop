import {GraphQLString,GraphQLList,GraphQLNonNull,GraphQLInt} from 'graphql'
import { resolver } from 'graphql-sequelize'
import { roleType } from '../types'
import { siteEnum } from '../enums'

var models = require('../../sequelize/models')

var usersQuery = {
	type: new GraphQLList(roleType),
	//resolve: (_, args) => citiesResolver(args)
	args: {
    id: {
      description: 'id of the role',
      type: GraphQLInt
    },
		type: {
			type: new GraphQLNonNull(siteEnum)
		}
  },
	resolve: resolver(models.Role, {
	//	include: false // disable auto including of associations based on AST - default: true
	})
}

export default usersQuery
