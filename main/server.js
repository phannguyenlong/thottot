// modules
const next = require('next')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const Passport = require('passport')

// build NextJS app
console.log(__dirname)
let devBuild = true
switch (process.env.NODE_ENV) {
  case 'production':
    devBuild = false
    break
  case 'test':
    devBuild = false
    break
  default:
    break
}
const app = next({ dev: devBuild })

// internals
const Router = require('./routes')
const { findUserById } = require('./api/API')
const { workerGetByID } = require('./api/workers')
const { getCookie } = require('./utils/cookie')
const {
  WorkerLocalStrategy,
  UserLocalStrategy,
  UserFacebookStrategy
} = require('./config/passportStrategies')

// domain and port configs
let port = 8080
let redirectDomain
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  redirectDomain = 'http://localhost:8080'
} else if (process.env.NODE_ENV === 'test') {
  redirectDomain = 'https://test.thotot.biz'
  port = 5000
} else {
  // production
  redirectDomain = 'https://thotot.biz'
}

// PassportJS used strategies
Passport.use('worker-local', WorkerLocalStrategy)
Passport.use('user-local', UserLocalStrategy)
Passport.use('user-facebook', UserFacebookStrategy)

Passport.serializeUser((user, done) => {
  const { _id: id, type } = user
  let isWorker = false
  if (type !== undefined) isWorker = true
  const userSerial = { id, isWorker }
  done(null, userSerial)
})

Passport.deserializeUser(async (userSerial, done) => {
  const { id, isWorker } = userSerial
  try {
    if (isWorker) {
      let { payload } = await workerGetByID(id)
      let { worker } = payload
      done(null, worker)
    } else {
      let resp = await findUserById(id)
      let { payload } = resp
      done(null, payload)
    }
  } catch (err) {
    done(err)
  }
})

// NextJS custom express server
const server = express()
const handler = Router.getRequestHandler(app)
app.prepare().then(() => {
  server.use(bodyParser.urlencoded({ extended: true, limit: '2mb' }))
  server.use(bodyParser.json({ limit: '2mb' }))
  server.use(
    // expires after 12 hours
    session({
      secret: 'mysecret',
      saveUninitialized: false,
      resave: false,
      rolling: false,
      cookie: { maxAge: 12 * 60 * 60 * 1000 }
    })
  )
  // service worker here
  server.get('/service-worker.js', (req, res) => {
    const filePath = './.next/service-worker.js'
    app.serveStatic(req, res, filePath)
  })

  server.use(Passport.initialize())
  server.use(Passport.session())

  // People can log out here
  server.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
  })

  // FB calls back here => redirect or fail.
  server.get('/facebook/auth/fb/cb', (req, res, next) => {
    Passport.authenticate('user-facebook', (err, user, info) => {
      if (err) res.status(500).send('error')
      if (!user) {
        res.status(400).send('no_users')
      } else {
        req.logIn(user, err => {
          if (err) res.status(500).send(err)
          let redirectPath = getCookie(req.headers.cookie, 'prevUrl')
          return res.redirect(`${redirectDomain}${redirectPath}`)
        })
      }
    })(req, res, next)
  })

  // Front-end calls here => FB API
  server.get('/auth/facebook', (req, res, next) => {
    Passport.authenticate('user-facebook', { scope: ['email'] })(req, res, next)
  })

  // Front-end calls here => local strategy
  server.post(
    '/auth/phone',
    Passport.authenticate('user-local'),
    (req, res) => {
      res.status(200).json(req.user)
    }
  )

  server.post(
    '/auth/worker',
    Passport.authenticate('worker-local'),
    (req, res) => {
      res.status(200).json(req.user)
    }
  )

  server.get('/auth/profile', (req, res) => {
    let { user } = req
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(400).send()
    }
  })

  server.use(handler)
  server.listen(port)
})
