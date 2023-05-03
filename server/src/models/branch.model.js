import mongoose from 'mongoose'
import timestamp from 'mongoose-timestamp'
import slugify from 'slugify'

var counterSchema = mongoose.Schema({
  slug: { type: String, required: true },
  seq: { type: Number, default: 0 }
})
var counter = mongoose.model('counter', counterSchema)

let imageSchema = mongoose.Schema({
  url: {
    // AWS-S3 public URL to image
    type: String,
    trim: true,
    required: true
  },
  caption: {
    // limit to 50 characters
    type: String,
    trim: true
  }
})
imageSchema.plugin(timestamp)

let branchSchema = mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'worker',
      required: true
    },
    branchName: {
      type: String,
      trim: true
    },
    branchPhone: {
      type: String,
      trim: true,
      required: true
    },
    branchEmail: {
      type: String,
      trim: true
    },
    open: {
      type: String,
      trim: true,
      required: true
    },
    close: {
      type: String,
      trim: true,
      required: true
    },
    place: {
      type: String, // placeoptions key ('100', '101', etc.)
      trim: true,
      required: true
    },
    address: {
      type: String,
      trim: true,
      required: true
    },
    images: [
      // images.length <= 5
      imageSchema
    ],
    description: {
      type: String, // less then 300 characters
      trim: true,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numOfRating: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { collection: 'branches' }
)
branchSchema.plugin(timestamp)

branchSchema.pre('save', async function() {
  try {
    let doc = this
    let slug = slugify(doc.branchName, { lower: true })
    let c = await counter.findOneAndUpdate(
      { slug: slug },
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    )
    doc.slug = c.seq + '-' + slug
  } catch (e) {
    console.log(e)
  }
})

let Branch = mongoose.model('branch', branchSchema)

export default Branch
