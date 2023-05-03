import mongoose from 'mongoose'
import JobModel from '../models/job.model'

let userSchema = mongoose.Schema({
  phone: { type: String, unique: true, sparse: true },
  avatarUrl: { type: String },
  name: { type: String },
  gender: { type: String },
  email: { type: String },
  address: { type: String },
  password: { type: String },
  facebookId: { type: String },
  accountType: { type: String } // 'fb', 'phone', 'both'
})

// HOOKS
userSchema.pre('remove', function(next) {
  JobModel.remove({ user: this._id }).exec()
  next()
})

const User = mongoose.model('user', userSchema)

export default User
