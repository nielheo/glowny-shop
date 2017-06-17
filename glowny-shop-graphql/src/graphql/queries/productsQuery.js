import {GraphQLString, GraphQLList, GraphQLNonNull} from 'graphql'
import { resolver } from 'graphql-sequelize'
import { productType } from '../types'

var models = require('../../sequelize/models')

var usersQuery = {
	type: new GraphQLList(productType),
	//resolve: (_, args) => citiesResolver(args)
	args: {
    sku: {
      description: 'id of the product',
      type: GraphQLString
    },
		shopCode: {
			type: new GraphQLNonNull(GraphQLString)
		},
  },
	resolve: (_, args) => { 
		return models.Shop.findOne({ where: { code: args['shopCode']}, raw: true}).then(shop => {
			var where = {}
			where['shopId'] = shop.id
			if(args['sku']) {
				where['sku'] = args['sku']
			}
			return models.Product.findAll({ 
				where: where,
				raw: true,
			}).then(result  => { 
				return result.map(result => { return { ...result, curr: shop.systemCurr }})
			})		
		})
	}
}

export default usersQuery
