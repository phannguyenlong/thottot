import React from 'react'
import { connect } from 'react-redux'
import redirect from '../src/redirect'
import { authProfile } from '../api/auth'

export default (options = { isWorker: false }) => Component => {
  class AuthComponent extends React.Component {
    static async getInitialProps({ ctx }) {
      let { req } = ctx
      let user = null
      if (req) {
        user = req.user
      } else {
        user = await authProfile()
      }

      if (!user) {
        if (options.isWorker) redirect(ctx, '/tho-dang-nhap')
        else redirect(ctx, '/dang-nhap')
      } else {
        let { type } = user
        if (type && !options.isWorker) redirect(ctx, '/')
        else if (!type && options.isWorker) redirect(ctx, '/')
      }

      return {}
    }

    render() {
      if (options.isWorker) {
        let { worker } = this.props
        return <Component {...{ worker }} />
      } else {
        let { user } = this.props
        return <Component {...{ user }} />
      }
    }
  }

  const mapStateToProps = ({ worker, user }) => {
    return { worker, user }
  }

  return connect(mapStateToProps)(AuthComponent)
}
