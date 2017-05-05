import express from 'express'
import graphqlHTTP from 'express-graphql'
import QueryType from './graphql/QueryType'
import { GraphQLSchema } from 'graphql'

var schema = new GraphQLSchema({
  query: QueryType,
// mutation: MutationType
})

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  query: QueryType,
  graphiql: true,
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')