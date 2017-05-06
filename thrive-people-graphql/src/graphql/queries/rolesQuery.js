import {GraphQLString,GraphQLList,GraphQLNonNull} from 'graphql'
import { resolver } from 'graphql-sequelize'
import { roleType } from '../types'

var models = require('../../sequelize/models')

var usersQuery = {
	type: new GraphQLList(roleType),
	//resolve: (_, args) => citiesResolver(args)
	resolve: resolver(models.Role, {
	//	include: false // disable auto including of associations based on AST - default: true
	})
}

export default usersQuery
