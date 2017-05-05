import { GraphQLObjectType } from 'graphql'

import { echoQuery } from './queries'

const QueryType = new GraphQLObjectType({
	name: 'query',
	fields: {
		echo: echoQuery,
	},
})

export default QueryType
