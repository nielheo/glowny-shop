'use strict'
import {attributeFields} from 'graphql-sequelize'
import {GraphQLObjectType,GraphQLList} from 'graphql'
import { resolver } from 'graphql-sequelize'
import roleType from './roleType'
var models = require('../../sequelize/models')
import {_} from 'underscore'

const userType = new GraphQLObjectType({
	name: 'User',
	description: 'A user',
	fields: _.assign(attributeFields(models.User))
})

export default userType
