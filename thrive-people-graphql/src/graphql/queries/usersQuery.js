import {GraphQLString,GraphQLList,GraphQLNonNull} from 'graphql'
import { resolver } from 'graphql-sequelize'
import { userType } from '../types'

var models = require('../../sequelize/models')

var usersQuery = {
	type: new GraphQLList(userType),
	//resolve: (_, args) => citiesResolver(args)
	resolve: resolver(models.User, {
	//	include: false // disable auto including of associations based on AST - default: true
	})
}

export default usersQuery
