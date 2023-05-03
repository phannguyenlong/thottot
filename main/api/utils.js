const fixedEncodeURIComponent = str => {
  return encodeURIComponent(str).replace(/[!'()*]/g, c => {
    return '%' + c.charCodeAt(0).toString(16)
  })
}

const mkQuery = queryObj => {
  let query = []
  Object.keys(queryObj).forEach(key => {
    if (queryObj[key]) {
      let encodedKey = fixedEncodeURIComponent(key)
      if (queryObj[key].constructor === Array)
        queryObj[key].forEach(v => {
          let encodedVal = fixedEncodeURIComponent(v)
          query.push(`${encodedKey}=${encodedVal}`)
        })
      else {
        let encodedVal = fixedEncodeURIComponent(queryObj[key])
        query.push(`${encodedKey}=${encodedVal}`)
      }
    }
  })
  let queryStr = '?' + query.join('&')
  return queryStr
}

module.exports = {
  mkQuery
}
