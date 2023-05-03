import mongoose from 'mongoose'
import timestamp from 'mongoose-timestamp'
import slugify from 'slugify'

var jobCounterSchema = mongoose.Schema({
  slug: { type: String, required: true },
  seq: { type: Number, default: 0 }
})

var jobCounter = mongoose.model('jobcounter', jobCounterSchema)

let jobImageSchema = mongoose.Schema({
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
jobImageSchema.plugin(timestamp)

let jobSchema = mongoose.Schema({
  slug: {
    type: String,
    unique: true
  },
  category: {
    type: Number,
    required: true
  },
  speciality: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  placeRequest: {
    type: Number,
    required: true
  },
  paymentType: {
    type: Number,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  images: [
    // images.length <= 5
    jobImageSchema
  ],
  description: {
    type: String
  }
})

jobSchema.plugin(timestamp)

jobSchema.pre('save', async function() {
  try {
    let doc = this
    let slug = slugify(doc.shortDescription, { lower: true })
    let c = await jobCounter.findOneAndUpdate(
      { slug: slug },
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    )
    doc.slug = c.seq + '-' + slug
  } catch (e) {
    console.error(e)
  }
})

let Job = mongoose.model('job', jobSchema)

export default Job
