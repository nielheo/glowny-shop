import { GraphQLObjectType } from 'graphql'

import { updateUserActiveMutation, addUserMutation } from './mutations'

const MutationType = new GraphQLObjectType({
	name: 'mutation',
	fields: {
		updateUserActive: updateUserActiveMutation,
		addUser: addUserMutation,
	}
})

export default MutationType
