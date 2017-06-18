'use strict'
import {attributeFields} from 'graphql-sequelize'
import {GraphQLObjectType,GraphQLList,GraphQLString,GraphQLBoolean,GraphQLEnumType} from 'graphql'
import { resolver } from 'graphql-sequelize'
import roleType from './roleType'
import { siteType } from '../enums'
var models = require('../../sequelize/models')
import {_} from 'underscore'

const shopType = new GraphQLObjectType({
	name: 'Shop',
	description: 'A shop',
	fields: {
		id: { type: GraphQLString },
		code: { type: GraphQLString },
    name: { type: GraphQLString },
    systemCurr: { type: GraphQLString },
	  isActive: { type: GraphQLBoolean },
	}
})

export default shopType
