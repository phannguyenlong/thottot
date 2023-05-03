export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_NAME: 'SET_NAME',
  SET_FB_ID: 'SET_FB_ID',
  SET_ACCOUNT_TYPE: 'SET_ACCOUNT_TYPE',
  SET_PHONE: 'SET_PHONE',
  SET_AVATAR: 'SET_AVATAR'
}

export const setUser = ({ name, avatarURL, accountType, fbID, phone }) => {
  return {
    type: actionTypes.SET_USER,
    payload: { name, avatarURL, accountType, fbID, phone }
  }
}

export const setName = name => {
  return {
    type: actionTypes.SET_NAME,
    payload: { name }
  }
}

export const setAvatar = avatarURL => {
  return {
    type: actionTypes.SET_AVATAR,
    payload: { avatarURL }
  }
}

export const setAccountType = accountType => {
  return {
    type: actionTypes.SET_ACCOUNT_TYPE,
    payload: { accountType }
  }
}

export const setFbId = fbID => {
  return {
    type: actionTypes.SET_FB_ID,
    payload: { fbID }
  }
}

export const setPhone = phone => {
  return {
    type: actionTypes.SET_PHONE,
    payload: { phone }
  }
}
