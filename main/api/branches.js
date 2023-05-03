const fetch = require('isomorphic-unfetch')
const config = require('../config/config')
const { mkQuery } = require('./utils')

const apiUrl = config.apiUrl

const branchesGet = async options => {
  let query = options
  let url = `${apiUrl}/branches`

  url += mkQuery(query)
  try {
    let resp = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin'
    })
    let data = await resp.json()

    return data
  } catch (e) {
    console.log(e)
  }
}

const branchesCount = async options => {
  let query = options
  let url = `${apiUrl}/branches/count`

  url += mkQuery(query)
  try {
    let resp = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin'
    })
    let data = await resp.json()

    return data
  } catch (e) {
    console.log(e)
  }
}

const branchGetBySlug = async options => {
  let { slug, ...query } = options
  let url = `${apiUrl}/branches/slug/${slug}`

  url += mkQuery(query)
  try {
    let resp = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin'
    })
    let data = await resp.json()

    return data
  } catch (e) {
    console.log(e)
  }
}

const branchGetByID = async options => {
  let { id, ...query } = options
  let url = `${apiUrl}/branches/${id}`

  url += mkQuery(query)
  try {
    let resp = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin'
    })
    let data = await resp.json()

    return data
  } catch (e) {
    console.log(e)
  }
}

const uploadImages = async (branchId, dir, images) => {
  let uploadUrl = `${apiUrl}/branches/${branchId}/images`
  let fd = new FormData()
  fd.append('directory', dir)

  images.forEach((image, iIndex) => {
    fd.append(`${iIndex}.jpg`, image.caption)
    fd.append('images', image.blob, `${iIndex}.jpg`)
  })

  let resp = await fetch(uploadUrl, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    body: fd
  })

  return resp
}

module.exports = {
  uploadImages,
  branchesCount,
  branchesGet,
  branchGetByID,
  branchGetBySlug
}
