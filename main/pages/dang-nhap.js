import React from 'react'
import { Link } from '../routes'
import Layout from '../components/Layout'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Swal from 'sweetalert2'
import logo from '../static/images/dang-nhap/logo.svg'
import sass from '../styles/sass/pages/dang-nhap.scss'
import TextField from '@material-ui/core/TextField'
import { getCookie } from '../utils/cookie'
import { domain } from '../config/config'

class DangNhap extends React.Component {
  static async getInitialProps({ ctx }) {}

  constructor() {
    super()
    this.state = {
      phone: '',
      password: ''
    }
  }
  onChangePhone = e => {
    this.setState({ phone: e.target.value })
  }
  onChangePassword = e => {
    this.setState({ password: e.target.value })
  }
  handleLoginPhone = async e => {
    // e.preventDefault()
    if (this.state.phone !== '' && this.state.password !== '') {
      let phoneNumber = this.state.phone
      let password = this.state.password

      let resp = await fetch('/auth/phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: phoneNumber, password: password })
      })
      console.log(resp)
      if (resp.status !== 200) {
        Swal.fire({
          title: 'Đăng nhập thất bại',
          text: 'Số điện thoại hoặc tài khoản không đúng',
          type: 'error',
          footer: '<a href="/dang-ky">Đăng ký ngay</a>'
        })
      } else {
        await Swal.fire({
          title: 'Đăng nhập thành công',
          text: 'Chào mừng bạn đến với thotot.biz',
          type: 'success'
        })
        let redirectPath = getCookie(document.cookie, 'prevUrl')
        window.location.href = `${domain}${redirectPath}`
      }
    }
  }
  render() {
    return (
      <Layout>
        <div className={sass.container}>
          <img src={logo} />
          <div className={sass.inputContainer}>
            <TextField
              required
              type="text"
              className={sass.input}
              label="Số điện thoại"
              onChange={this.onChangePhone}
              variant="outlined"
              fullWidth={true}
              name="username"
            />
            <TextField
              required
              type="password"
              classes={{ root: sass.input }}
              label="Mật khẩu"
              onChange={this.onChangePassword}
              variant="outlined"
              fullWidth={true}
              name="password"
            />
            <div className={sass.textWithLink}>
              <a>Quên mật khẩu?</a>
            </div>
            <div className={sass.checkboxContainer}>
              <Checkbox />
              <div>Tự động đăng nhập</div>
            </div>
          </div>
          <div className={sass.buttonContainer}>
            <div className={sass.button}>
              <Button
                type="submit"
                classes={{
                  root: sass.btnRoot
                }}
                size="large"
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={this.handleLoginPhone}
              >
                Đăng nhập
              </Button>
            </div>
            <hr />
            <div className={sass.button}>
              <a href="/auth/facebook">
                <Button
                  classes={{
                    root: sass.root
                  }}
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                >
                  Đăng nhập bằng Facebook
                </Button>
              </a>
            </div>
            <div className={sass.textWithLink}>
              <span>Chưa có tài khoản?</span>
              <Link route="/dang-ky">
                <a>Đăng ký ngay</a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
export default DangNhap
