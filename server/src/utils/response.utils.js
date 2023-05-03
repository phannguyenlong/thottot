export const mkResponse = (respStatus, payload, error) => {
  let respData = {
    status: respStatus
  }
  if (respStatus === 'success') {
    respData.payload = payload
  } else if (respStatus === 'fail') {
    respData.payload = payload
  } else if (respStatus === 'error') {
    respData.error = error
  }

  return respData
}
