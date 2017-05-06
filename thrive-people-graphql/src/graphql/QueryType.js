import { GraphQLObjectType } from 'graphql'

import { echoQuery, usersQuery } from './queries'

const QueryType = new GraphQLObjectType({
	name: 'query',
	fields: {
		echo: echoQuery,
		users: usersQuery,
	},
})

export default QueryType
