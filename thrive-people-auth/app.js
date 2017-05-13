import express from 'express'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken' // used to create, sign, and verify tokens
//import User   = require('./app/models/user') // get our mongoose model
import morgan from 'morgan'
import db from './app/models'

const env = process.env.NODE_ENV || 'development'
const config = require('./config.json')[env]

const app = express()
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080 // used to create, sign, and verify tokens
db.sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully.')
  }, function (err) { 
    console.log('Unable to connect to the database:', err)
  }) // connect to database



const User = db['User'] 

app.set('superSecret', config.secret) // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use morgan to log requests to the console
app.use(
  //function(req, res) {
  //res.header('Access-Control-Allow-Origin', '*')
  //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  morgan('dev')
//}
)

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api')
})

// API ROUTES -------------------
// get an instance of the router for api routes
var apiRoutes = express.Router() 

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
  
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Email and Password are required.' })
  } else {
  // return the information including token as JSON
    User.findOne({
      attributes: ['id', 'firstName', 'lastName', 'isActive', 'passwordHash'],
      where: { email: req.body.email },
    }).then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.passwordHash, function(err, res1) {
          if (res1) {
            var token = jwt.sign(user.dataValues, app.get('superSecret'), 
              { expiresIn: 60 * 30 })

            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token,
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

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes)

// =======================
// start the server ======
// =======================
app.listen(port)
console.log('Magic happens at http://localhost:' + port)