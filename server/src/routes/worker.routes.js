import express from 'express'
import Worker from '../controllers/worker.controller'
let router = express.Router()

// POST
router.post('/', Worker.create)
router.post('/auth', Worker.authenticate)
router.post('/:id/branches', Worker.addBranch)
router.post(
  '/:id/avatar',
  Worker.multerAvatar.single('avatar'),
  Worker.uploadAvatar
)

// GET
router.get('/', Worker.findAll)
router.get('/:id', Worker.findById)
router.get('/findByLogin/:login', Worker.findByLogin)

// DELETE
router.delete('/:id', Worker.deleteById)

// PUT
router.put('/:id', Worker.updateById)

export default router
