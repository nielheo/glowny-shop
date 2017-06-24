import { GraphQLObjectType } from 'graphql'

import { 
	updateUserMutation, 
	updateUserActiveMutation, 
	addUserMutation, 
	addProductMutation,
	updateProductMutation } 
from './mutations'

const MutationType = new GraphQLObjectType({
	name: 'mutation',
	fields: {
		addProduct: addProductMutation,
		addUser: addUserMutation,
		updateProduct: updateProductMutation,
		updateUser: updateUserMutation,
		updateUserActive: updateUserActiveMutation,
	}
})

export default MutationType
