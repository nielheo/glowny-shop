import { GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLInputObjectType,GraphQLList } from 'graphql'
import { resolver } from 'graphql-sequelize'
import { userType } from '../types'
import { siteType } from '../enums'
import Bluebird from 'bluebird'

const uuid = require('uuid')

var models = require('../../sequelize/models')

const AddUserInput = new GraphQLInputObjectType({
  name: 'AddUserInput',
  fields: {
    email: {
      description: 'User email',
      type: new GraphQLNonNull(GraphQLString)
    },
    firstName: {
      description: 'User first name',
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      description: 'User first name',
      type: new GraphQLNonNull(GraphQLString)
    },
    type: { 
      description: 'Site type status',
      type: new GraphQLNonNull(siteType)
    },
    shopCode: {
      description: 'Unique Code of your shop',
      type: GraphQLString
    },
    roles: {
      description: 'List or role id',
      type: new GraphQLNonNull(new GraphQLList(GraphQLString))
    }
  }
})

var updateUserActiveMutation = {
	type: userType,
  args: {
    input: {
      description: 'Add User Input',
      type: new GraphQLNonNull(AddUserInput)
    },
  },
  description: 'Add New User',
  resolve: function(obj, { input }) {
    console.log(input)
    var id =  uuid()
    return models.sequelize.transaction(function (t) {
      return models.User.create(
      { 
        id: id,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        type: input.type, 
        isActive: true,
        password: 'P@ssw0rd',
      }, {transaction: t})
      .then(result =>
        Bluebird.map(input.roles, function(role) {
          return models.User_Role.create({
            roleId: role,
            userId: result.id
          }, {transaction: t}).then(function() {
            console.log("done");
          }).catch(err => {
            throw new Error()
          })
        })
      )
    }).then(result => {
      return models.User.findById(id).then(user => {
        console.log('add user success')
        //response(user).code(200)
        return user
    }).catch(err => {
      console.log(err)
    })
  })
}}

export default updateUserActiveMutation
