import express from 'express'
import user from '../controllers/user.controller'

let router = express.Router()

//GET
router.get('/facebook/:id', user.findByFbId)
router.get('/:id', user.findById)
//POST
router.post('/facebook/register', user.registerByFacebook)
router.post('/:id/jobs', user.createJob)
router.post('/phone/register', user.registerByPhone)
router.post('/phone/check', user.checkPhoneDuplicate)
router.post('/phone/match', user.matchUserByPhone)
router.post('/phone/find', user.findUserByPhone)
router.post(
  '/:id/avatar',
  user.multerAvatar.single('avatar'),
  user.uploadAvatar
)
// PUT
router.put('/phone/update', user.updatePhoneUser)
router.put('/facebook/update', user.updateFaceUser)

export default router
