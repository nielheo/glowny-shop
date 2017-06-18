import {GraphQLString,GraphQLList,GraphQLNonNull,GraphQLInt} from 'graphql'
import { resolver } from 'graphql-sequelize'
import { shopType } from '../types'

var models = require('../../sequelize/models')

var usersQuery = {
	type: new GraphQLList(shopType),
	//resolve: (_, args) => citiesResolver(args)
	args: {
    code: {
      description: 'code of shop',
      type: new GraphQLNonNull(GraphQLString)
    },
  },
	resolve: resolver(models.Shop, {
	//	include: false // disable auto including of associations based on AST - default: true
	})
}

export default usersQuery
