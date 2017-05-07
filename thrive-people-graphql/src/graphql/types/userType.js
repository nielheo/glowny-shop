'use strict'
import {attributeFields} from 'graphql-sequelize'
import {GraphQLObjectType,GraphQLList} from 'graphql'
import { resolver } from 'graphql-sequelize'
import roleType from './roleType'
var models = require('../../sequelize/models')
import {_} from 'underscore'

console.log(roleType)

const userType = new GraphQLObjectType({
	name: 'User',
	description: 'A user',
	fields: _.assign(attributeFields(models.User), {
		roles: {
      type: new GraphQLList(roleType),
      resolve: resolver(models.User.Roles, {
        // When set to false, the query will execute as a JOIN on the database,
        // otherwise, it will make two round-trips.
        separate: false // load seperately, disables auto including - default: false
      })
    }
	})
})

export default userType
