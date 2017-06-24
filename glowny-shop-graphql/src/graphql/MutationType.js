import { GraphQLObjectType } from 'graphql'

import { 
	updateUserMutation, 
	updateUserActiveMutation, 
	addUserMutation, 
	addProductMutation } 
from './mutations'

const MutationType = new GraphQLObjectType({
	name: 'mutation',
	fields: {
		addUser: addUserMutation,
		updateUser: updateUserMutation,
		updateUserActive: updateUserActiveMutation,
		addProduct: addProductMutation,
	}
})

export default MutationType
