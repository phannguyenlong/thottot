import JobModel from '../models/job.model'
import { mkResponse } from '../utils/response.utils'

// GET /jobs
export const findAll = async (req, res) => {
  try {
    let jobs = await JobModel.find()

    res.status(200).json(mkResponse('success', { jobs }, null))
  } catch (e) {
    res.status(500).json(mkResponse('error', null, e))
  }
}

// GET /jobs/:slug
export const findJobBySlug = async (req, res) => {
  let { slug } = req.params

  try {
    let job = await JobModel.findOne({ slug: slug })
    res.status(200).json(mkResponse('success', job, null))
  } catch (e) {
    console.error(e)
    res.status(500).json(mkResponse('error', null, e))
  }
}

export default {
  findAll,
  findJobBySlug
}
