import { GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLInputObjectType,GraphQLList } from 'graphql'
import { resolver } from 'graphql-sequelize'
import { userType } from '../types'
import { siteType } from '../enums'
import Bluebird from 'bluebird'

const uuid = require('uuid')

var models = require('../../sequelize/models')

const UpdateUserInput = new GraphQLInputObjectType({
  name: 'UpdateUserInput',
  fields: {
    id: {
      description: 'User Id',
      type: new GraphQLNonNull(GraphQLString)
    },
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
    roles: {
      description: 'List or role id',
      type: new GraphQLNonNull(new GraphQLList(GraphQLString))
    }
  }
})

var updateUserMutation = {
	type: userType,
  args: {
    input: {
      description: 'Add User Input',
      type: new GraphQLNonNull(UpdateUserInput)
    },
  },
  description: 'Add New User',
  resolve: function(obj, { input }) {
    console.log(input)
    return models.sequelize.transaction(function (t) {
      return models.User.update(
      { email: input.email,
        firstName: input.firstName,
        lastName: input.lastName },
      { where: { id: input.id } }
      , {transaction: t})
      .then(models.User_Role.destroy({
        where: { userId: input.id}
      }), {transaction: t})
      .then(result =>
        Bluebird.map(input.roles, function(role) {
          return models.User_Role.create({
            roleId: role,
            userId: input.id
          }, {transaction: t}).then(function() {
            console.log("done");
          }).catch(err => {
            throw new Error()
          })
        })
      )
    }).then(result => {
      return models.User.findById(input.id).then(user => {
        console.log('update user success')
        //response(user).code(200)
        return user
    }).catch(err => {
      console.log(err)
    })
  })
}}

export default updateUserMutation
