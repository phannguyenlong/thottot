import { actionTypes } from '../actions/worker.actions'

export const workerInitialState = {
  type: '',
  fullname: '',
  email: '',
  phone: '',
  avatar: '',
  specialities: [],
  branches: []
}

export default (state = workerInitialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.SET_WORKER:
      return {
        ...state,
        ...payload
      }
    case actionTypes.SET_FULL_NAME:
      return {
        ...state,
        fullname: payload.fullname
      }
    case actionTypes.SET_AVATAR:
      return {
        ...state,
        avatar: payload.avatar
      }
    case actionTypes.SET_ACCOUNT_TYPE:
      return {
        ...state,
        type: payload.type
      }
    case actionTypes.SET_EMAIL:
      return {
        ...state,
        email: payload.email
      }
    default:
      return state
  }
}
