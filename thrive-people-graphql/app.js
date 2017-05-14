import express from 'express'
import graphqlHTTP from 'express-graphql'
import QueryType from './src/graphql/QueryType'
import MutationType from './src/graphql/MutationType'
import { GraphQLSchema } from 'graphql'
import cors from 'cors'
import db from './src/sequelize/models'
import jwt from 'jsonwebtoken'

var schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})

const app = express()

app.use(function(req, res, next) {
  //console.log(req.headers)
  var token = req.headers['x-access-token']
  if (token) {
    //console.log(token)
    // verifies secret and checks exp
    jwt.verify(token, 'iLoveAngelPhatchakorn', function(err, decoded) {      
      if (err) {
        res.status(403)
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes

        req.decoded = decoded;  
        console.log('==============================')
        console.log(decoded)  
        console.log('==============================')
        //next();
      }
    });
  } else {
    //console.log('no token')
  }
  next()
})

app.use('/graphql', cors(), graphqlHTTP((request) => {
  return ({
    schema: schema,
    query: QueryType,
    context: { token: request.headers['x-access-token'] || '' },
    graphiql: true,
})}))


app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')

db.sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully.')
  }, function (err) { 
    console.log('Unable to connect to the database:', err)
  })

export default app
