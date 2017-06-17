import {GraphQLString, GraphQLList, GraphQLNonNull} from 'graphql'
import { resolver } from 'graphql-sequelize'
import { productType } from '../types'

var models = require('../../sequelize/models')

var usersQuery = {
	type: new GraphQLList(productType),
	//resolve: (_, args) => citiesResolver(args)
	args: {
    //id: {
    //  description: 'id of the role',
    //  type: GraphQLString
    //},
		shopCode: {
			type: new GraphQLNonNull(GraphQLString)
		},
  },
	resolve: (_, args) => { 
		return models.Shop.findOne({ where: { code: args['shopCode']}, raw: true}).then(shop => {
			return models.Product.findAll({ 
				where: { shopId: shop.id },
				raw: true,
			}).then(result  => { 
				console.log(result)
				return result.map(result => { return { ...result, curr: shop.systemCurr }})
			})		
			
		})
	}
}

export default usersQuery
