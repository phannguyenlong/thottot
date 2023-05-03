import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import timestamp from 'mongoose-timestamp'
import uniqueValidator from 'mongoose-unique-validator'
import BranchModel from './branch.model'

let workerSchema = mongoose.Schema(
  {
    // not required
    avatar: {
      // AWS-S3 public URL to avatar
      trim: true,
      type: String
    },
    branches: [
      {
        ref: 'branch',
        type: mongoose.Schema.Types.ObjectId
      }
    ],
    ID: {
      trim: true,
      type: String,
      unique: true
    },
    phone: {
      trim: true,
      type: String,
      uniqe: true
    },
    // required
    email: {
      index: true,
      required: true,
      trim: true,
      type: String,
      unique: true
    },
    password: {
      bcrypt: true,
      required: true,
      select: false,
      type: String
    },
    fullname: {
      required: true,
      trim: true,
      type: String
    },
    type: {
      required: true,
      trim: true,
      type: String // 'individual' || 'brand'
    },
    specialities: {
      required: true,
      trim: true,
      type: [String] // specialities key ('100', '101', etc.)
    }
  },
  { collection: 'workers' }
)

// STATICS
workerSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({ email: login })
  return user
}

// HOOKS
workerSchema.pre('remove', function(next) {
  BranchModel.remove({ owner: this._id }).exec()
  next()
})

// PLUGINS
workerSchema.plugin(bcrypt)
workerSchema.plugin(timestamp)
workerSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} {TYPE} = {VALUE} to be unique.'
})
workerSchema.index({ email: 1 })

let Worker = mongoose.model('worker', workerSchema)

export default Worker
