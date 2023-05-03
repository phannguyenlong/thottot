export const actionTypes = {
  SET_WORKER: 'SET_WORKER',
  SET_FULL_NAME: 'SET_FULL_NAME',
  SET_EMAIL: 'SET_EMAIL',
  SET_ACCOUNT_TYPE: 'SET_ACCOUNT_TYPE',
  SET_AVATAR: 'SET_AVATAR'
}

export const setWorker = ({ ...worker }) => {
  return {
    type: actionTypes.SET_WORKER,
    payload: worker
  }
}

export const setFullName = fullname => {
  return {
    type: actionTypes.SET_FULL_NAME,
    payload: { fullname }
  }
}

export const setAvatar = avatar => {
  return {
    type: actionTypes.SET_AVATAR,
    payload: { avatar }
  }
}

export const setAccountType = type => {
  return {
    type: actionTypes.SET_ACCOUNT_TYPE,
    payload: { type }
  }
}

export const setEmail = email => {
  return {
    type: actionTypes.SET_EMAIL,
    payload: { email }
  }
}
