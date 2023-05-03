const getConfig = require('next/config')

const { publicRuntimeConfig } = getConfig.default()
const { SERVER_NODE_ENV } = publicRuntimeConfig

let config = {
  test: {
    apiUrl: 'https://api.test.thotot.biz',
    domain: 'https://test.thotot.biz',
    workerImagesFolder: 'test',
    workerAvatarFolder: 'avatars-test'
  },
  development: {
    apiUrl: 'http://localhost:3000',
    domain: 'http://localhost:8080',
    workerImagesFolder: 'dev',
    workerAvatarFolder: 'avatars'
  },
  production: {
    apiUrl: 'https://api.thotot.biz',
    domain: 'https://thotot.biz',
    workerImagesFolder: 'prod',
    workerAvatarFolder: 'avatars-prod'
  }
}

module.exports = config[SERVER_NODE_ENV]
