import AWS from 'aws-sdk'
import path from 'path'

const S3_CONFIG = path.join(__dirname, '../constants/.awss3.json')

AWS.config.loadFromPath(S3_CONFIG)
let s3 = new AWS.S3()

export default s3
