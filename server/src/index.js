// TODO: add passport authentication
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import mongoose, { mongo } from 'mongoose'
// import sendSMS from './services/speedsms_service'
import apiRoutes from './routes/api.routes'
let port = process.env.PORT || 3000
import session from 'express-session'

if (process.env.NODE_ENV === 'test') {
  port = 3005
}

const allowedOrigins = [
  'https://thotot.biz',
  'https://test.thotot.biz',
  `http://localhost:${port}`,
  'http://localhost:8080',
  'https://facebook.com',
  '*'
]

const CORSOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg =
        'CORS policy for this site does not allow access from the specified Origin'
      return callback(new Error(msg), false)
    }

    return callback(null, true)
  }
}

const app = express()
// middlewares
app.use(
  session({
    secret: 'mysecret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
)
// This thing makes everything difficult (disable for now)
app.use(cors(/*CORSOptions*/))
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true, limit: '2mb' }))
app.use(bodyParser.json({ limit: '2mb' }))

// Use this to check for routes that require authentication: req.session.passport.user => {facebookId: <>, phoneId: <>}

// connect to mongoose

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/thotot')
} else {
  mongoose.connect('mongodb://localhost/thotot-test')
}
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Mongoose connected')
})

// Test authentication route
app.use('/authenticate', (req, res, next) => {
  if (req.user) {
    res.status(200).send('ok')
  } else {
    res.status(403).send('unauthenticated')
  }
})

// api apiRoutes
app.use('/', apiRoutes)

// start server
app.listen(port, () => {
  console.log('Server is running on port: ' + port)
})
