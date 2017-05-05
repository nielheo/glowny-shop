import express from 'express'
import graphqlHTTP from 'express-graphql'
import QueryType from './src/graphql/QueryType'
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

var Sequelize = require('sequelize')
  , sequelize = new Sequelize('thrive_people', 'root', '123qwe!@#', {
      dialect: 'mysql', // or 'sqlite', 'postgres', 'mariadb'
      port:    3306, // or 5432 (for postgres)
    });

sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });