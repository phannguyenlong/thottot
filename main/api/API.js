const fetch = require('isomorphic-unfetch')
const config = require('../config/config')
const apiUrl = config.apiUrl
const { mkQuery } = require('./utils')

const uploadUserAvatar = async (userId, image, name) => {
  let uploadUrl = `${apiUrl}/users/${userId}/avatar`
  let fd = new FormData()
  fd.append('avatar', image, name)

  let resp = await fetch(uploadUrl, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    body: fd
  })

  return resp
}
//----------------------Jobs-----------------------
const getJobBySlug = async options => {
  let { slug } = options
  console.log(slug)
  let url = `${apiUrl}/jobs/${slug}`
  let resp = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin'
  })
  let respJson = await resp.json()
  console.log(respJson)
  return respJson
}

const postJob = async (userId, job) => {
  let resp = await fetch(`${apiUrl}/users/${userId}/jobs`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(job)
  })

  let respJson = await resp.json()
  return respJson
}

const findJob = async () => {
  let resp = await fetch(`${apiUrl}/jobs`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let respJson = await resp.json()
  return respJson
}
//-----------------------User----------------------
// REGISTER USER
const registerUserFacebook = async user => {
  let resp = await fetch(`${apiUrl}/users/facebook/register`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  let respJson = await resp.json()
  return respJson
}
const registerUserPhone = async (phone, name, password) => {
  let resp = await fetch(`${apiUrl}/users/phone/register`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone: phone,
      name: name,
      password: password,
      accountType: 'phone'
    })
  })
  let respJson = await resp.json()
  return respJson
}
// FIND USER
const findUserById = async id => {
  let resp = await fetch(`${apiUrl}/users/${id}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin'
  })
  let respJson = await resp.json()
  return respJson
}

// This should also be deprecated
const findUserByFbId = async id => {
  let resp = await fetch(`${apiUrl}/users/facebook/${id}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin'
  })

  let respJson = await resp.json()
  return respJson
}
// This should be deprecated
const findUserByPhone = async phone => {
  let resp = await fetch(`${apiUrl}/users/phone/find`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone: phone
    })
  })
  let respJson = await resp.json()
  return respJson
}

const matchUserByPhone = async (phone, password) => {
  let resp = await fetch(`${apiUrl}/users/phone/match`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phone: phone,
      password: password
    })
  })
  let respJson = await resp.json()
  return respJson
}

const checkPhoneDuplicate = async phone => {
  let resp = await fetch(`${apiUrl}/users/phone/check`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber: phone
    })
  })
  let respJson = await resp.json()
  return respJson
}
// UPDATE
const updateUser = async (typeOfAuth, data) => {
  console.log(data)
  console.log(typeOfAuth)
  if (typeOfAuth === 'phone') {
    let resp = await fetch(`${apiUrl}/users/phone/update`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: data
      })
    })
    if (data.isChangeAvatar) {
      let userData = await resp.json()
      let { user } = userData.payload
      resp = await uploadUserAvatar(user._id, data.avatar, `${user._id}.jpg`)
      if (resp.status !== 200) throw new Error('Lỗi hệ thống, vui lòng thử lại')
    }
    return resp
  } else if (typeOfAuth === 'facebook') {
    let resp = await fetch(`${apiUrl}/users/facebook/update`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: data
      })
    })
    if (data.isChangeAvatar) {
      console.log('change ava')
      let userData = await resp.json()
      let user = userData.payload
      resp = await uploadUserAvatar(user._id, data.avatar, `${user._id}.jpg`)
      if (resp.status !== 200) throw new Error('Lỗi hệ thống, vui lòng thử lại')
    }
    return resp
  }
}

//---------------------Others----------------------
const sendOTP = async (phoneNumber, OTP) => {
  // let OTP = generateOTP()
  let message = `THOTOT: ma OTP cua ban la ${OTP}`
  let resp = await fetch(
    `https://restapi.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?Phone=${phoneNumber}&Content=${message}&ApiKey=AF8A7C0AC610390EDCB73CEEA0F986&SecretKey=493520F5475434D321D619BA2B08B1&SmsType=2&Brandname=QCAO_ONLINE`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  let respJson = await resp.json()
  return respJson
}

module.exports = {
  // Jobs
  getJobBySlug,
  postJob,
  findJob,
  // User
  registerUserFacebook,
  registerUserPhone,
  findUserById,
  findUserByFbId, // Deprecated
  findUserByPhone, // Deprecated
  matchUserByPhone,
  checkPhoneDuplicate,
  updateUser,
  sendOTP
}
