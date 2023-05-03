function setCookie(cname, cvalue, exdays) {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
  var d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/'
}
function getCookie(cookieString, cname) {
  var name = cname + '='
  var ca = cookieString.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
module.exports = { setCookie, getCookie }
