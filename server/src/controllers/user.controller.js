import UserModel from '../models/user.model'
import JobModel from '../models/job.model'
import { mkResponse } from '../utils/response.utils'
import S3 from '../services/s3.service'
import multer from 'multer'
import multerS3 from 'multer-s3'
//-----------------POST------------------
// POST :id/avatar
export const multerAvatar = multer({
  fileFilter: async (req, file, cb) => {
    let { id } = req.params
    try {
      let user = await UserModel.findById(id)
      if (user) cb(null, true)
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
          root = 'user-avatar-prod'
          break
        case 'test':
          root = 'user-avatar-test'
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

export const uploadAvatar = async (req, res) => {
  let { id } = req.params

  console.log('Does it reach heree!!???')

  if (req.file) {
    console.log('!!!!!!!!!!!!!! What is req.file? ')
    console.log(req.file)

    try {
      let user = await UserModel.findById(id)
      if (user.name === undefined) {
        //if user log in by facebook
        user.avatarUrl = req.file.location
      } else {
        // if user log in by phone
        console.log('save by phoneee')
        user.avatarUrl = req.file.location
      }
      user.save()
      console.log(user)

      if (user) {
        res.status(200).json(mkResponse('success', { user }, null))
      } else {
        res.status(404).json(mkResponse('fail', { message: 'WorkerNotFound' }))
      }
    } catch (e) {
      res.status(500).json(mkResponse('error', null, e))
    }
  } else {
    console.log('What about here!?? ')
    res
      .status(400)
      .json(mkResponse('fail', { message: 'CouldNotUpload' }, null))
  }
}
// POST /:id/jobs
export const createJob = async (req, res) => {
  let { id } = req.params
  let data = req.body

  try {
    let user = await UserModel.findById(id)
    if (user) {
      let jobDoc = new JobModel(data)
      jobDoc.user = user
      let job = await jobDoc.save()

      res.status(200).json(mkResponse('success', { job }))
    } else {
      res.status(404).json(mkResponse('fail', { message: 'UserNotFound' }))
    }
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

// POST /facebook/
export const registerByFacebook = async (req, res) => {
  let facebookUser = req.body
  try {
    let data = await UserModel.findOne(
      { facebookId: facebookUser.id },
      (err, user) => {
        if (err) console.log(err)
        if (user) {
          res.status(200).json(mkResponse('success', user, null))
        }
      }
    )
    // if user == null => create user
    if (data == null) {
      const newUser = new UserModel({
        facebookId: facebookUser.id,
        name: facebookUser.displayName,
        accountType: 'fb',
        avatarUrl: `https://graph.facebook.com/${
          facebookUser.id
        }/picture?width=480`,
        email: facebookUser.email
      })
      newUser.save(err => {
        if (err) console.log(err)
        console.log(newUser)
        res.status(200).json(mkResponse('success', newUser, null))
      })
    }
  } catch (err) {
    console.log(err.name)
  }
}

// POST /users/phone/match
export const matchUserByPhone = async (req, res) => {
  let { phone, password } = req.body
  try {
    let user = await UserModel.findOne({ phone: phone, password: password })
    if (user) {
      res.status(200).json(mkResponse('success', user, null))
    } else {
      res
        .status(400)
        .json(mkResponse('failed', { message: 'UserNotFound' }, null))
    }
  } catch (e) {
    console.error(e)
  }
}
// POST phone/find
export const findUserByPhone = async (req, res) => {
  console.log('find by phone is runnung')
  let phone = req.body.phone
  try {
    let data = await UserModel.findOne({ phone: phone }, (err, user) => {
      if (err) console.log(err)
      if (user) {
        console.log('found user in database')
        res.status(200).json(mkResponse('success', { user }, null))
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(mkResponse('error', null, err))
  }
}

// POST phone/check
export const checkPhoneDuplicate = async (req, res) => {
  console.log('check by phone is running')
  console.log(req.body)
  let phone = req.body.phoneNumber
  try {
    let data = await UserModel.findOne({ phone: phone }, (err, user) => {
      if (err) console.log(err)
      if (user) {
        console.log('found user in database')
        console.log(user)
        res
          .status(400)
          .json(mkResponse('fail', { message: 'DuplicatePhoneNumber' }))
      } else {
        res.status(200).json(mkResponse('success', { user }, null))
      }
    })
  } catch (err) {
    console.log('Error - checkPhoneDuplicate: ')
    console.log(err.name)
    res.status(500).json(mkResponse('error', null, err))
  }
}
// POST phone/register
export const registerByPhone = async (req, res) => {
  console.log('Register by phone is running')
  console.log(req.body)
  let phoneUser = req.body
  try {
    let data = await UserModel.findOne(
      { phone: phoneUser.phone },
      (err, user) => {
        if (err) console.log(err)
        if (user) {
          console.log('found user in database')
          console.log(user)
          res
            .status(400)
            .json(mkResponse('fail', { message: 'DuplicatePhoneNumber' }))
        }
      }
    )
    // if user == null --> create new user
    if (data == null) {
      console.log('data is null, create new user')
      const newUser = new UserModel({
        phone: phoneUser.phone,
        name: phoneUser.name,
        password: phoneUser.password,
        accountType: phoneUser.accountType
      })
      newUser.save(err => {
        if (err) console.log(err)
        res.status(200).json(mkResponse('success', newUser, null))
      })
    }
  } catch (err) {
    console.log('error')
    console.log(err.name)
    res.status(500).json(mkResponse('error', null, err))
  }
}
//---------------------GET----------------------------
// GET /facebook/:id
export const findByFbId = async (req, res) => {
  let { id } = req.params
  try {
    let user = await UserModel.findOne({ facebookId: id })
    if (user) {
      res.status(200).json(mkResponse('success', user, null))
    } else {
      res
        .status(404)
        .json(mkResponse('failed', { message: 'UserNotFound' }, null))
    }
  } catch (e) {
    console.log(e)
    res.status(500).json(mkResponse('error', null, e))
  }
}
// GET /:id
export const findById = async (req, res) => {
  let { id } = req.params
  try {
    let user = await UserModel.findById(id)
    if (user) {
      res.status(200).json(mkResponse('success', user, null))
    } else {
      res
        .status(404)
        .json(mkResponse('failed', { message: 'UserNotFound' }, null))
    }
  } catch (e) {
    console.error(e)
    res.status(500).json(mkResponse('error', null, e))
  }
}
//--------------------PUT------------------------------
// PUT phone/update
export const updatePhoneUser = async (req, res) => {
  console.log('update phone user is running')
  let userUpdate = req.body.data
  console.log(userUpdate)
  try {
    let data = await UserModel.findOne(
      { phone: userUpdate.phone },
      (err, user) => {
        if (err) console.log(err)
        if (user) {
          console.log('found user in database')
          user.phone = userUpdate.phone
          user.name = userUpdate.name
          user.gender = userUpdate.gender
          user.address = userUpdate.address
          user.email = userUpdate.email
          user.password = userUpdate.password
          user.save()
          res.status(200).json(mkResponse('success', { user }, null))
        }
      }
    )
  } catch (err) {
    console.log(err)
    res.status(500).json(mkResponse('error', null, err))
  }
}

// PUT facebook/update
export const updateFaceUser = async (req, res) => {
  console.log('update facebook user is running')
  let userUpdate = req.body.data
  console.log(userUpdate)
  try {
    let data = await UserModel.findOne(
      { facebookId: userUpdate.fbID },
      (err, user) => {
        console.log(user)
        if (err) console.log(err)
        if (user) {
          console.log('found user in database')
          user.phone = userUpdate.phone
          user.name = userUpdate.name
          user.gender = userUpdate.gender
          user.address = userUpdate.address
          user.email = userUpdate.email
          user.save()
          res.status(200).json(mkResponse('success', user, null))
        } else {
          res.status(500).json(mkResponse('error', null, err))
        }
      }
    )
  } catch (err) {
    console.log(err)
    res.status(500).json(mkResponse('error', null, err))
  }
}

const UserController = {
  // POST
  multerAvatar,
  uploadAvatar,
  createJob,
  registerByFacebook,
  matchUserByPhone,
  findUserByPhone,
  checkPhoneDuplicate,
  registerByPhone,
  // GET
  findByFbId,
  findById,
  // PUT
  updatePhoneUser,
  updateFaceUser
}

export default UserController
