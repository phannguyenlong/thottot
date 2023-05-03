import React from 'react'
import Link from 'next/link'
import sass from '../../styles/sass/layout/Footer.scss'

class Footer extends React.Component {
  static async getInitialProps(props) {
    const { isServer } = props.ctx
    return { isServer }
  }

  render() {
    return (
      <div className={sass.container}>
        <div className={sass.child}>
          <div className={sass.links}>
            <Link href="/gioi-thieu">
              <b>Về thợ tốt</b>
            </Link>
            <Link href="/lien-he">
              <b>Liên hệ</b>
            </Link>
            <Link href="/tro-giup">
              <b>Trợ giúp</b>
            </Link>
            <Link href="/dieu-khoan-su-dung">
              <b>Điều khoản sử dụng</b>
            </Link>
          </div>
          <div className={sass.trademark}>
            Copyright 2019 © Công Ty TNHH THỢ TỐT
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
