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
		shopCode: {
      description: 'code of shop. This is required when type = shop',
      type: GraphQLString
    },
		first: {
			type: new GraphQLNonNull(GraphQLInt)
		}
  },
	resolve: (_, args) => { 
		var where = {}
		Object.keys(args).map(key => {
			if (key !== 'first' && key !== 'shopCode') {
				where[key] = args[key]
			}
		})
		if (args['type'] === 'shop') {
			if (!args['shopCode']) {
				throw new Error('shopCode is required')
			} else {
				//where['shop.id'] = args['shopId']
				//console.log()

				//var shopId = Sequelize.literal('Shop.id')
				
				return models.User.findAll({ 
					limit: args.first, 
					sort: 'email',
					where: where,
					include: {
							model: models.Shop,
							where: { code: args['shopCode'] }
					}
				})
			}
		} else {
			return models.User.findAll({ 
				limit: args.first, 
				sort: 'email',
				where: where
			})
		}
	}
}

export default usersQuery
