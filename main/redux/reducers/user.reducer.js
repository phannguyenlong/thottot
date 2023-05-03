import { actionTypes } from '../actions/user.actions'

export const userInitialState = {
  name: '',
  fbID: '',
  accountType: '',
  phone: '',
  avatarURL: ''
}

export default (state = userInitialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        ...payload
      }
    case actionTypes.SET_NAME:
      return {
        ...state,
        name: payload.name
      }
    case actionTypes.SET_AVATAR:
      return {
        ...state,
        avatarURL: payload.avatarURL
      }
    case actionTypes.SET_ACCOUNT_TYPE:
      return {
        ...state,
        accountType: payload.accountType
      }
    case actionTypes.SET_FB_ID:
      return {
        ...state,
        fbID: payload.fbID
      }
    case actionTypes.SET_PHONE:
      return {
        ...state,
        phone: payload.phone
      }
    default:
      return state
  }
}
