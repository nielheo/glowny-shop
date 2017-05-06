import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql'

import { echoQuery, usersQuery, userQuery, rolesQuery } from './queries'

const viewerType = new GraphQLObjectType({
	name: 'Viewer',
	description: 'A viewer',
	fields: {
		users: usersQuery,
		user: userQuery,
		roles: rolesQuery,
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
