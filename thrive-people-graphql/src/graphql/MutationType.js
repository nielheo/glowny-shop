import { GraphQLObjectType } from 'graphql'

import { updateUserMutation, updateUserActiveMutation, addUserMutation } from './mutations'

const MutationType = new GraphQLObjectType({
	name: 'mutation',
	fields: {
		addUser: addUserMutation,
		updateUser: updateUserMutation,
		updateUserActive: updateUserActiveMutation,
	}
})

export default MutationType
