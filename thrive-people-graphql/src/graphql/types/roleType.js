'use strict'
import {attributeFields} from 'graphql-sequelize'
import {GraphQLObjectType,GraphQLString} from 'graphql'
import { resolver } from 'graphql-sequelize'
import userType from './userType'
import { siteEnum } from '../enums'
var models = require('../../sequelize/models')
import {_} from 'underscore'

//console.log(userType)

const roleType = new GraphQLObjectType({
	name: 'Role',
	description: 'A role',
	fields: {
		id: { type: GraphQLString },
		title: { type: GraphQLString },
    type: { type: siteEnum },
	}
})

export default roleType
