import BranchModel from '../models/branch.model'
import WorkerModel from '../models/worker.model'
import { mkResponse } from '../utils/response.utils'
import S3 from '../services/s3.service'
import multer from 'multer'
import multerS3 from 'multer-s3'

const acceptedInclude = ['owner']

export const multerImages = multer({
  fileFilter: async (req, file, cb) => {
    let { id } = req.params
    try {
      let branch = await BranchModel.findById(id)
      if (branch) cb(null, true)
      else cb(null, false)
    } catch (e) {
      cb(e)
    }
  },
  storage: multerS3({
    s3: S3,
    bucket: 'thotot-features',
    acl: 'public-read',
    key: (req, file, cb) => {
      let root
      switch (process.env.NODE_ENV) {
        case 'production':
          root = 'prod'
          break
        case 'test':
          root = 'test'
          break
        default:
          root = 'dev'
          break
      }
      let { directory } = req.body
      let key = `${root}/${file.originalname}`
      if (directory) key = `${root}/${directory}/${file.originalname}`
      cb(null, key)
    }
  })
})

// POST /branches
export const create = async (req, res) => {
  let data = req.body

  try {
    let branch = new BranchModel(data)
    await branch.save()

    res.status(200).json(mkResponse('success', { branch }, null))
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

// POST /branches/:id/images
export const uploadImages = async (req, res) => {
  let { id } = req.params

  if (req.files) {
    let images = req.files.map(file => {
      return {
        url: file.location,
        caption: req.body[file.originalname]
      }
    })

    try {
      let branch = await BranchModel.findById(id)

      await branch.update({ $addToSet: { images: images } })
      res.status(200).json(mkResponse('success', { images }, null))
    } catch (e) {
      res.status(500).json(mkResponse('error', null, e))
    }
  } else {
    res
      .status(400)
      .json(mkResponse('fail', { message: 'CouldNotUpload' }, null))
  }
}

// GET /branches/count
// accepted query `place`, `speciality`
export const count = async (req, res) => {
  let { speciality, place } = req.query
  try {
    let query = BranchModel.countDocuments()
    if (speciality) {
      let ids = await WorkerModel.find({
        specialities: speciality
      }).select('_id')
      let ownerIds = ids.map(id => id._id)
      query = query.where({ owner: { $in: ownerIds } })
    }
    if (place) query = query.where({ place: place })

    let count = await query.exec()

    res.status(200).json(mkResponse('success', { count }, null))
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

// GET /branches
// accepted query `include`, `limit`, `skip`, `speciality`, `place`
export const findAll = async (req, res) => {
  let { include, limit, skip, speciality, place } = req.query
  try {
    let query = BranchModel.find()
    if (speciality) {
      let ids = await WorkerModel.find({
        specialities: speciality
      }).select('_id')
      let ownerIds = ids.map(id => id._id)
      query = query.where({ owner: { $in: ownerIds } })
    }
    if (place) query = query.where({ place: place })
    if (skip) query = query.skip(parseInt(skip))
    if (limit) query = query.limit(parseInt(limit))
    if (include) {
      if (include.constructor === Array)
        include = include.filter(item => acceptedInclude.indexOf(item) !== -1)
      query = query.populate(include)
    }

    let branches = await query.exec()

    res.status(200).json(mkResponse('success', { branches }, null))
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

export const findById = async (req, res) => {
  let { id } = req.params
  let { include } = req.query

  try {
    let query = BranchModel.findById(id)
    if (include) {
      if (include.constructor === Array)
        include = include.filter(item => acceptedInclude.indexOf(item) !== -1)
      query = query.populate(include)
    }

    let branch = await query.exec()

    if (branch) {
      res.status(200).json(mkResponse('success', { branch }, null))
    } else {
      res.status(404).json(mkResponse('fail', { message: 'BranchNotFound' }))
    }
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

export const findBySlug = async (req, res) => {
  let { slug } = req.params
  let { include } = req.query

  try {
    let query = BranchModel.findOne({ slug: slug })
    if (include) {
      if (include.constructor === Array)
        include = include.filter(item => acceptedInclude.indexOf(item) !== -1)
      query = query.populate(include)
    }

    let branch = await query.exec()

    if (branch) {
      res.status(200).json(mkResponse('success', { branch }, null))
    } else {
      res.status(404).json(mkResponse('fail', { message: 'BranchNotFound' }))
    }
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

// PUT /branches/slugs
export const updateSlugs = async (req, res) => {
  try {
    let branches = await BranchModel.find()

    branches = await Promise.all(
      branches.map(async branch => {
        branch = await branch.save()
        console.log(branch.slug)
        return branch
      })
    )

    res.status(200).json(mkResponse('success', { branches }, null))
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

const BranchControllers = {
  findBySlug,
  updateSlugs,
  findById,
  count,
  multerImages,
  create,
  uploadImages,
  findAll
}

export default BranchControllers
