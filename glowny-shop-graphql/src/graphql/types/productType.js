'use strict'
import {attributeFields} from 'graphql-sequelize'
import {GraphQLObjectType,GraphQLList,GraphQLString,GraphQLFloat,GraphQLEnumType,GraphQLBoolean} from 'graphql'
import { resolver } from 'graphql-sequelize'
import roleType from './roleType'
import { siteType } from '../enums'
var models = require('../../sequelize/models')
import {_} from 'underscore'

const productType = new GraphQLObjectType({
	name: 'Product',
	description: 'A product',
	fields: {
		id: { type: GraphQLString },
		sku: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
		curr: { type: GraphQLString },
    price: { type: GraphQLFloat },
    isActive: { type: GraphQLBoolean }
	}
})

export default productType
