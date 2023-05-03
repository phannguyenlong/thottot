// TODO: Add validation and ACLs
import WorkerModel from '../models/worker.model'
import BranchModel from '../models/branch.model'
import { mkResponse } from '../utils/response.utils'
import S3 from '../services/s3.service'
import multer from 'multer'
import multerS3 from 'multer-s3'

export const multerAvatar = multer({
  fileFilter: async (req, file, cb) => {
    let { id } = req.params
    try {
      let worker = await WorkerModel.findById(id)
      if (worker) cb(null, true)
      else cb(null, false)
    } catch (e) {
      cb(e)
    }
  },
  storage: multerS3({
    s3: S3,
    bucket: 'thotot',
    acl: 'public-read',
    key: (req, file, cb) => {
      let root
      switch (process.env.NODE_ENV) {
        case 'production':
          root = 'avatars-prod'
          break
        case 'test':
          root = 'avatars-test'
          break
        default:
          root = 'avatars'
          break
      }
      let { directory } = req.body
      let key = `${root}/${file.originalname}`
      if (directory) key = `${root}/${req.directory}/${file.originalname}`
      cb(null, key)
    }
  })
})

// POST /workers
export const create = async (req, res) => {
  let data = req.body

  try {
    let worker = new WorkerModel(data)
    await worker.save()

    let protectedWorker = worker.toObject()
    delete protectedWorker.password

    res
      .status(200)
      .json(mkResponse('success', { worker: protectedWorker }, null))
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

// POST /workers/auth
export const authenticate = async (req, res) => {
  let { email, password } = req.body
  try {
    let worker = await WorkerModel.findOne({ email: email }).select('+password')
    if (worker) {
      let valid = await worker.verifyPassword(password)
      if (valid) {
        let protectedWorker = worker.toObject()
        delete protectedWorker.password
        res
          .status(200)
          .json(mkResponse('success', { worker: protectedWorker }, null))
      } else {
        res
          .status(400)
          .json(mkResponse('fail', { message: 'InvalidPassword' }, null))
      }
    } else {
      res
        .status(404)
        .json(mkResponse('fail', { message: 'WorkerNotFound' }, null))
    }
  } catch (e) {
    console.log(e)
    res.status(500).json(mkResponse('error', null, e))
  }
}

// POST /workers/:id/branches
export const addBranch = async (req, res) => {
  let { id } = req.params
  let data = req.body

  try {
    let worker = await WorkerModel.findById(id)
    if (worker) {
      let branch = new BranchModel(data)
      if (worker.type === 'individual') {
        branch.branchEmail = worker.email
        branch.branchName = worker.fullname
      }
      branch.owner = worker
      await branch.save()

      await worker.update({ $addToSet: { branches: branch } })

      res.status(200).json(mkResponse('success', { branch }))
    } else {
      res.status(404).json(mkResponse('fail', { message: 'WorkerNotFound' }))
    }
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

// POST /workers/:id/avatar
export const uploadAvatar = async (req, res) => {
  let { id } = req.params

  if (req.file) {
    try {
      let worker = await WorkerModel.findById(id)
      worker.avatar = req.file.location
      worker.save()

      if (worker) {
        res.status(200).json(mkResponse('success', { worker }, null))
      } else {
        res.status(404).json(mkResponse('fail', { message: 'WorkerNotFound' }))
      }
    } catch (e) {
      res.status(500).json(mkResponse('error', null, e))
    }
  } else {
    res
      .status(400)
      .json(mkResponse('fail', { message: 'CouldNotUpload' }, null))
  }
}

// GET /workers
export const findAll = async (req, res) => {
  try {
    let workers = await WorkerModel.find()

    res.status(200).json(mkResponse('success', { workers }, null))
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

// GET /workers/:id
export const findById = async (req, res, next) => {
  let { id } = req.params

  try {
    let worker = await WorkerModel.findById(id)

    if (worker) {
      res.status(200).json(mkResponse('success', { worker }, null))
    } else {
      res.status(404).json(mkResponse('fail', { message: 'WorkerNotFound' }))
    }
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

// GET /workers/findByLogin/:login
export const findByLogin = async (req, res) => {
  let { login } = req.params

  try {
    let worker = await WorkerModel.findByLogin(login)

    if (worker) {
      res.status(200).json(mkResponse('success', { worker }, null))
    } else {
      res.status(404).json(mkResponse('fail', { message: 'WorkerNotFound' }))
    }
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

// DELETE /workers/:id
export const deleteById = async (req, res) => {
  let { id } = req.params

  try {
    let worker = await WorkerModel.findById(id)
    if (worker) {
      await worker.remove()
      res.status(200).json(mkResponse('success', { worker }, null))
    } else {
      res.status(404).json(mkResponse('fail', { message: 'WorkerNotFound' }))
    }
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

// UPDATE /workers/:id
export const updateById = async (req, res) => {
  const { id } = req.params
  try {
    const worker = await WorkerModel.findById(id).select('+password')
    if (worker) {
      const valid = await worker.verifyPassword(req.body.passwordVerify)
      if (valid) {
        for (let field in req.body) worker[field] = req.body[field]
        const newWorker = await worker.save()
        let protectedWorker = newWorker.toObject()
        delete protectedWorker.password
        res
          .status(200)
          .json(mkResponse('success', { worker: protectedWorker }, null))
      } else {
        res
          .status(400)
          .json(mkResponse('fail', { message: 'Unauthorized' }, null))
      }
    } else {
      res
        .status(404)
        .json(mkResponse('fail', { message: 'WorkerNotFound' }, null))
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(mkResponse('error', null, err))
  }
}

const WorkerController = {
  // POST
  create,
  authenticate,
  addBranch,
  multerAvatar,
  uploadAvatar,

  // GET
  findAll,
  findById,
  findByLogin,

  // PUT
  updateById,

  // DELETE
  deleteById
}

export default WorkerController
