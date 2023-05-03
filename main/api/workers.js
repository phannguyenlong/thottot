const fetch = require('isomorphic-unfetch')
const config = require('../config/config')
const { uploadImages } = require('./branches')

const apiUrl = config.apiUrl

// Upload workers avatar with marching ID
const workerUploadAvatar = async (workerId, image, name) => {
  let uploadUrl = `${apiUrl}/workers/${workerId}/avatar`
  let fd = new FormData()
  fd.append('avatar', image, name)

  let resp = await fetch(uploadUrl, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    body: fd
  })

  let jsonBody = await resp.json()

  return jsonBody
}

// Register new worker and associating branches
const workerRegister = async reqData => {
  let { avatar, branches, ...workerInfo } = reqData

  try {
    let resp = await fetch(`${apiUrl}/workers`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workerInfo)
    })
    let data = await resp.json()

    if (resp.status !== 200) {
      let { error } = data
      if (error.name === 'ValidationError') throw error
      else throw new Error('Lỗi hệ thống, vui lòng thử lại')
    }

    let { worker } = data.payload
    data = await workerUploadAvatar(worker._id, avatar, `${worker.email}.jpg`)
    if (resp.status === 400) throw new Error('Không tải được ảnh đại diện')
    else if (resp.status !== 200)
      throw new Error('Lỗi hệ thống, vui lòng thử lại')

    await Promise.all(
      branches.map(async (branch_, bIndex) => {
        let { images, ...branchInfo } = branch_
        branchInfo.place = branch_.district
        branchInfo.open = branch_.open.format('hh:mm')
        branchInfo.close = branch_.close.format('hh:mm')
        resp = await fetch(`${apiUrl}/workers/${worker._id}/branches`, {
          method: 'POST',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(branchInfo)
        })
        data = await resp.json()
        if (resp.status === 404) throw new Error('Không tạo được chi nhánh')
        else if (resp.status !== 200)
          throw new Error('Lỗi hệ thống, vui lòng thử lại')

        let { branch } = data.payload
        images = images.filter(image => image.blob !== null)
        resp = await uploadImages(
          branch._id,
          `${worker.email}/branch${bIndex}`,
          images
        )
        if (resp.status === 400) throw new Error('Không tải được ảnh')
        else if (resp.status !== 200)
          throw new Error('Lỗi hệ thống, vui lòng thử lại')
      })
    )
  } catch (e) {
    return e
  }
}

const workerGetByID = async id => {
  let resp = await fetch(`${apiUrl}/workers/${id}`, {
    method: 'GET',
    mode: 'cors',
    credentails: 'same-origin'
  })

  let jsonBody = await resp.json()

  return jsonBody
}

const workerUpdateByID = async (id, reqData) => {
  let resp = await fetch(`${apiUrl}/workers/${id}`, {
    method: 'PUT',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqData)
  })

  let data = await resp.json()
  return data
}

const workerAuthenticate = async (email, password) => {
  let resp = await fetch(`${apiUrl}/workers/auth`, {
    method: 'POST',
    mode: 'cors',
    credentails: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  let jsonBody = await resp.json()

  return jsonBody
}

module.exports = {
  workerRegister,
  workerAuthenticate,
  workerGetByID,
  workerUpdateByID,
  workerUploadAvatar
}
