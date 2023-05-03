import { actionTypes } from '../actions/auth.actions'

export const authInitialState = {
  isAuthenticated: false,
  isWorker: false,
  ID: ''
}

export default (state = authInitialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.LOGGED_IN:
      return {
        isAuthenticated: true,
        isWorker: payload.isWorker,
        ID: payload.ID
      }
    case actionTypes.LOGGED_OUT:
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state
  }
}
