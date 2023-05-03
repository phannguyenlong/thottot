import express from 'express'
import job from '../controllers/job.controller'

let router = express.Router()

// GET
router.get('/', job.findAll)
router.get('/:slug', job.findJobBySlug)

export default router
