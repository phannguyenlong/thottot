// externals
import React from 'react'
import App, { Container } from 'next/app'
import Router from 'next/router'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import { MuiThemeProvider, jssPreset } from '@material-ui/core/styles'
import { create } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/moment'
// internals
import createStore from '../store'
import getPageContext from '../src/getPageContext'
// apis
import { authProfile } from '../api/auth'
// styling
import '../static/css/cascader.css'
// redux actions
import { loggedIn, loggedOut } from '../redux/actions/auth.actions'
import { setUser } from '../redux/actions/user.actions'
import { setWorker } from '../redux/actions/worker.actions'

Router.events.on('routeChangeComplete', () => {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    const els = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]'
    )
    const timestamp = new Date().valueOf()
    els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp
  }
})

// inject material ui before sass
const jss = create({
  ...jssPreset(),
  insertionPoint: process.browser
    ? document.getElementById('jss-insertion-point')
    : null
})

const auth = async ctx => {
  let credentials = { isAuth: false, user: null }
  if (ctx.req) {
    // get user from req on server side
    if (ctx.req.user) {
      credentials.isAuth = true
      credentials.user = ctx.req.user
    }
  } else {
    // check authentication by requesting to server on client side
    let user = await authProfile()
    if (user) {
      credentials.isAuth = true
      credentials.user = user
    }
  }

  return credentials
}

class MyApp extends App {
  constructor() {
    super()
    this.pageContext = getPageContext()
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    let node_env = ''
    // If it's on the server
    if (typeof ctx.req !== 'undefined') {
      node_env = process.env.NODE_ENV
    }

    let credentials = await auth(ctx)

    return { pageProps, credentials, node_env }
  }

  componentWillMount() {
    // If it's on the client
    let { credentials, store } = this.props
    let { dispatch } = store
    if (credentials.isAuth) {
      // Set this for the Redux state
      let { user } = credentials
      let { accountType } = user
      if (accountType !== undefined) {
        dispatch(loggedIn({ id: user._id, isWorker: false }))
        dispatch(
          setUser({
            name: user.name,
            fbID: user.facebookId,
            accountType: user.accountType,
            phone: user.phone,
            avatarURL: user.avatarUrl
          })
        )
      } else {
        let { _id, ...userData } = user
        dispatch(loggedIn({ id: _id, isWorker: true }))
        dispatch(setWorker({ ...userData }))
      }
    } else dispatch(loggedOut())
  }

  componentDidMount() {
    // remove server-side injected css
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <JssProvider
          jss={jss}
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <Provider store={store}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Component {...pageProps} />
              </MuiPickersUtilsProvider>
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(MyApp))
