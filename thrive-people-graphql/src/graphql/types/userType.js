'use strict'
import {attributeFields} from 'graphql-sequelize'
import {GraphQLObjectType,GraphQLList,GraphQLString,GraphQLBoolean,GraphQLEnumType} from 'graphql'
import { resolver } from 'graphql-sequelize'
import roleType from './roleType'
import { siteType } from '../enums'
var models = require('../../sequelize/models')
import {_} from 'underscore'

const userType = new GraphQLObjectType({
	name: 'User',
	description: 'A user',
	fields: {
		id: { type: GraphQLString },
		email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
		type: { type: siteType },
    isActive: { type: GraphQLBoolean },
		roles: {
      type: new GraphQLList(roleType),
      resolve: resolver(models.User.Roles, {
        // When set to false, the query will execute as a JOIN on the database,
        // otherwise, it will make two round-trips.
        separate: false // load seperately, disables auto including - default: false
      })
    }
	}
})

export default userType
