export const actionTypes = {
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT'
}

export const loggedIn = ({ id, isWorker }) => {
  return {
    type: actionTypes.LOGGED_IN,
    payload: {
      isWorker,
      ID: id
    }
  }
}

export const loggedOut = () => {
  return {
    type: actionTypes.LOGGED_OUT
  }
}
