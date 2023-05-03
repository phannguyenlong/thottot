// NextJS
import React from 'react'
import { Link } from '../routes'

// MaterialUI
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'

// Components
import Layout from '../components/Layout'

// Sass
import sass from '../styles/sass/pages/dang-nhap.scss'

// Imgs
import logo from '../static/images/dang-nhap/logo.svg'

// Utils
import { getCookie } from '../utils/cookie'
import Swal from 'sweetalert2'
import { domain } from '../config/config'

class DangNhap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    })
  }

  handleLogin = async e => {
    e.preventDefault()
    const { email, password } = this.state
    let resp = await fetch('/auth/worker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (resp.status !== 200) {
      if (resp.status >= 400 && resp.status < 500) {
        Swal.fire({
          title: 'Đăng nhập thất bại',
          text: 'Thông tin tài khoản không đúng',
          type: 'error',
          footer: '<a href="/dang-ky">Đăng ký ngay</a>'
        })
      }
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

  render() {
    const { email, password } = this.state
    return (
      <Layout>
        <div className={sass.container}>
          <img src={logo} />
          <form role="form" action="/user-dang-nhap" method="post">
            <div className={sass.inputContainer}>
              <TextField
                required
                type="text"
                className={sass.input}
                label="Email"
                variant="outlined"
                fullWidth={true}
                name="email"
                value={email}
                onChange={this.handleChange('email')}
              />
              <TextField
                required
                type="password"
                classes={{ root: sass.input }}
                label="Mật khẩu"
                variant="outlined"
                fullWidth={true}
                name="password"
                value={password}
                onChange={this.handleChange('password')}
              />
              {/*
              <div className={sass.textWithLink}>
                <a>Quên mật khẩu?</a>
              </div>
              */}
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
                  onClick={this.handleLogin}
                >
                  Đăng nhập
                </Button>
              </div>
              <hr />
              <div className={sass.textWithLink}>
                <span>Chưa có tài khoản?</span>
                <Link route="signupWorker">
                  <a>Đăng kí ngay</a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    )
  }
}

export default DangNhap
