import express from 'express'
import graphqlHTTP from 'express-graphql'
import QueryType from './src/graphql/QueryType'
import { GraphQLSchema } from 'graphql'
import db from './src/sequelize/models'

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

db.sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully.')
  }, function (err) { 
    console.log('Unable to connect to the database:', err)
  })
