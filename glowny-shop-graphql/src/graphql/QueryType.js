import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql'

import { echoQuery, usersQuery, rolesQuery, productsQuery } from './queries'

const viewerType = new GraphQLObjectType({
	name: 'Viewer',
	description: 'A viewer',
	fields: {
		users: usersQuery,
		roles: rolesQuery,
		products: productsQuery,
	},
})

var viewerQuery = {
	type: viewerType,
	//resolve: (_, args) => citiesResolver(args)
	//args: { jwt: { type: new GraphQLNonNull(GraphQLString) } },
	resolve: () => {
		return {  }
	}
}

const QueryType = new GraphQLObjectType({
	name: 'query',
	fields: {
		echo: echoQuery,
		viewer: viewerQuery,
	}
})

export default QueryType
