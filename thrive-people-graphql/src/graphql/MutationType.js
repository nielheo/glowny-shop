import { GraphQLObjectType } from 'graphql'

import { updateUserActiveMutation } from './mutations'

const MutationType = new GraphQLObjectType({
	name: 'mutation',
	fields: {
		updateUserActive: updateUserActiveMutation,
	}
})

export default MutationType
