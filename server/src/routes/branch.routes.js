import express from 'express'
import Branch from '../controllers/branch.controller'

let router = express.Router()

// POST
router.post('/', Branch.create)
router.post(
  '/:id/images',
  Branch.multerImages.array('images', 5),
  Branch.uploadImages
)

// GET
router.get('/', Branch.findAll)
router.get('/count', Branch.count)
router.get('/:id', Branch.findById)
router.get('/slug/:slug', Branch.findBySlug)

// ROUTER
router.put('/slugs', Branch.updateSlugs)

export default router
