'use strict'
import {attributeFields} from 'graphql-sequelize'
import {GraphQLObjectType} from 'graphql'
var models = require('../../sequelize/models')
import {_} from 'underscore'

const roleType = new GraphQLObjectType({
	name: 'Role',
	description: 'A role',
	fields: _.assign(attributeFields(models.Role))
})

export default roleType
