const fetch = require('isomorphic-unfetch')
const config = require('../config/config')

const domain = config.domain

const authProfile = async () => {
  try {
    let resp = await fetch(`${domain}/auth/profile`)
    if (resp.ok) {
      let user = await resp.json()
      return user
    } else {
      return null
    }
  } catch (err) {
    return null
  }
}

module.exports = {
  authProfile
}
