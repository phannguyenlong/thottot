import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { setCookie } from '../../utils/cookie'

class Layout extends React.Component {
  static async getInitialProps({ ctx }) {}
  componentWillUnmount() {
    if (typeof window.location.pathname !== 'undefined') {
      if (
        window.location.pathname !== '/dang-nhap' &&
        window.location.pathname !== '/dang-ky' &&
        window.location.pathname !== '/tho-dang-nhap'
      ) {
        setCookie('prevUrl', window.location.pathname, 1)
      }
    }
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <Head>
          <title>Thợ Tốt</title>
        </Head>
        <Header />
        <div id="content">{children}</div>
        <Footer />
        <style jsx global>{`
          body {
            margin: 0px;
            font-family: 'Open Sans', sans-serif;
            background-color: #e5e5e5;
          }
          #content {
            margin-top: 64px;
          }
        `}</style>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Layout
