const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: FacebookStrategy } = require('passport-facebook').Strategy
const { domain } = require('./config')
const {
  matchUserByPhone,
  findUserByFbId,
  registerUserFacebook
} = require('../api/API')
const { workerAuthenticate } = require('../api/workers')

const UserLocalStrategy = new LocalStrategy(
  async (username, password, done) => {
    try {
      let { status, payload, error } = await matchUserByPhone(
        username,
        password
      )
      if (status === 'success') {
        done(null, payload)
      } else if (status === 'failed') {
        done(null, false)
      } else if (status === 'error') {
        done(new Error(error))
      }
    } catch (err) {
      done(err)
    }
  }
)

const WorkerLocalStrategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (username, password, done) => {
    try {
      let { status, payload, error } = await workerAuthenticate(
        username,
        password
      )
      if (status === 'success') {
        let { worker } = payload
        done(null, worker)
      } else if (status === 'fail') {
        let { message } = payload
        done(null, false, message)
      } else if (status === 'error') {
        done(new Error(error))
      }
    } catch (err) {
      done(err)
    }
  }
)

const UserFacebookStrategy = new FacebookStrategy(
  {
    clientID: '2675789942435146',
    clientSecret: '05fd1965dbdea499dd26c00872ddd82e',
    callbackURL: `${domain}/facebook/auth/fb/cb`,
    profileFields: ['email', 'displayName', 'id']
  },
  async (accessToken, refreshToken, profile, done) => {
    let result = await findUserByFbId(profile.id)
    if (result.status === 'success') {
      done(null, result.payload)
    } else if (result.status === 'failed') {
      // User has no account yet. Do the registeration.
      let { payload } = await registerUserFacebook(profile)
      done(null, payload)
    } else {
      done(null, false)
    }
    done(null, false)
  }
)

module.exports = {
  WorkerLocalStrategy,
  UserLocalStrategy,
  UserFacebookStrategy
}
