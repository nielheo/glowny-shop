import {GraphQLString, GraphQLList, GraphQLNonNull} from 'graphql'
import { resolver } from 'graphql-sequelize'
import { productType } from '../types'

var models = require('../../sequelize/models')

var usersQuery = {
	type: new GraphQLList(productType),
	//resolve: (_, args) => citiesResolver(args)
	args: {
    id: {
      description: 'id of the product',
      type: GraphQLString
    },
		shopCode: {
			type: new GraphQLNonNull(GraphQLString)
		},
  },
	resolve: (_, args) => { 
		return models.Shop.findOne({ where: { code: args['shopCode']}, raw: true}).then(shop => {
			if (shop) {
				var where = {}
				where['shopId'] = shop.id
				if(args['id']) {
					where['id'] = args['id']
				}
				return models.Product.findAll({ 
					where: where,
					raw: true,
				}).then(result  => { 
					return result.map(result => { return { ...result, curr: shop.systemCurr }})
				})		
			} else {
				return []
			}
		})
	}
}

export default usersQuery
