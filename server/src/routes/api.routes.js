import express from 'express'
import workerRoutes from './worker.routes'
import branchRoutes from './branch.routes'
import userRoutes from './user.routes'
import jobRoutes from './job.routes'

let router = express.Router()

router.get('/', (req, res) => {
  res.json({
    status: 'Server is running',
    message: 'Thotot.biz API'
  })
})

router.use('/workers', workerRoutes)

router.use('/branches', branchRoutes)
router.use('/users', userRoutes)
router.use('/jobs', jobRoutes)

export default router
