import express from 'express'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken' 
import morgan from 'morgan'
import graphqlHTTP from 'express-graphql'
import QueryType from './src/graphql/QueryType'
import MutationType from './src/graphql/MutationType'
import { GraphQLSchema } from 'graphql'
import cors from 'cors'
import db, { User, Role } from './src/sequelize/models'

const env = process.env.NODE_ENV || 'development'
const config = require('./config/config.json')[env]

var schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})

db.sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully.')
  }, function (err) { 
    console.log('Unable to connect to the database:', err)
  })

const app = express()

app.set('superSecret', config.secret) // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//app.use(morgan('dev'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

var apiRoutes = express.Router() 

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/auth', function(req, res) {
  //console.log(req)
  if (!req.body.site) {
    res.status(400)
    res.json({ success: false, message: 'Site is required.' })
  }
  else if(!req.body.email || !req.body.password ) {
    res.status(400)
    res.json({ success: false, message: 'Email and Password are required.' })
  } else {
  // return the information including token as JSON
    User.findOne({
      where: { email: req.body.email, type: req.body.site, isActive: true },
      include: [
        { model: Role },
      ],
    }).then(user => {
      if (user) {
        //user.Roles.findAll().then(result => result)
        console.log(req.body.password)
        console.log(user.passwordHash)
        bcrypt.compare(req.body.password, user.passwordHash, function(err, res1) {
          if (res1) {
            var claims = {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              roles: user.Roles.map(role => role.code),
            }
            //console.log(user.Roles)

            var token = jwt.sign(claims, app.get('superSecret'))
            //var refreshed = jwt.refresh(token, 3600, app.get('superSecret'))

            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token,
            //  refreshToken: refreshed,
            })
          } else {
            res.status(400)
            res.json({ success: false, message: 'Authentication failed.' })
          }
        })
      } else {
        res.status(400)
        res.json({ success: false, message: 'Authentication failed.' })
      }
    })
  }
  // find the user
  /*User.findAll({
  where: {
      email: res.body.email,
    },
  })
  User.findOne({
    name: req.body.name,
  }, function(err, user) {

    if (err) throw err

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' })
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' })
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        })

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        })
      }   

    }

  })*/
})

app.use('/', apiRoutes)

/*
app.use(function(req, res, next) {
  //console.log(req.headers)
  var token = req.headers['x-access-token']
  if (token) {
    //console.log(token)
    // verifies secret and checks exp
    jwt.verify(token, 'iLoveAngelPhatchakorn', function(err, decoded) {      
      if (err) {
        res.status(403)
        console.log(err)
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
})*/

app.use('/graphql', cors(), graphqlHTTP((request) => {
  return ({
    schema: schema,
    query: QueryType,
    context: { token: request.headers['x-access-token'] || '' },
    graphiql: true,
})}))


app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')



export default app
