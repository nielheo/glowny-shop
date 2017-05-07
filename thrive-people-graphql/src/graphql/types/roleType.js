'use strict'
import {attributeFields} from 'graphql-sequelize'
import {GraphQLObjectType,GraphQLList} from 'graphql'
import { resolver } from 'graphql-sequelize'
import userType from './userType'
var models = require('../../sequelize/models')
import {_} from 'underscore'

//console.log(userType)

const roleType = new GraphQLObjectType({
	name: 'Role',
	description: 'A role',
	fields: _.assign(attributeFields(models.Role), {
		//users: {
    //  type: new GraphQLList(userType),
    //  resolve: resolver(models.Role.Users, {
    //    // When set to false, the query will execute as a JOIN on the database,
    //    // otherwise, it will make two round-trips.
    //    separate: false // load seperately, disables auto including - default: false
    //  })
    //
		//}
	})
})

export default roleType
