import React from 'react'
import { sendOTP } from '../api/API.js'
import Layout from '../components/Layout'
import Button from '@material-ui/core/Button'
import Swal from 'sweetalert2'
import { generateOTP } from '../utils/OTP'
import validator from 'validator'
import TextField from '@material-ui/core/TextField'
import { registerUserPhone, checkPhoneDuplicate } from '../api/API'

import sass from '../styles/sass/pages/dang-ky.scss'

class DangKy extends React.Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      errName: false,
      phoneNumber: '',
      errPhoneNumber: false,
      password: '',
      errPassword: false,
      verifyPassword: '',
      errVerifyPassword: false
    }
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }
  handleClick = async e => {
    const { userName, phoneNumber, password } = this.state
    e.preventDefault()
    if (this.validate()) {
      let duplicateResult = await checkPhoneDuplicate(phoneNumber)
      if (duplicateResult.payload.message === 'DuplicatePhoneNumber') {
        Swal.fire('Số điện thoại đã tồn tại', 'Vui lòng thử lại', 'error')
      } else if (duplicateResult.status === 'success') {
        let authOTP = generateOTP()
        sendOTP(phoneNumber, authOTP)
        const { value: OTP } = await Swal.fire({
          type: 'question',
          title: 'Nhập mã OTP',
          input: 'text',
          allowOutsideClick: false,
          showCancelButton: true,
          inputValidator: value => {
            if (!value) {
              return 'Bạn cần phải nhập mã OTP'
            }
            if (value !== authOTP) {
              return 'Mã OTP sai'
            }
          }
        })
        if (OTP === authOTP) {
          let data = await registerUserPhone(phoneNumber, userName, password)
          if (data.status === 'success') {
            Swal.fire('Success', 'Welcome to thotot.biz!', 'success')
            window.location.href = '/dang-nhap'
          } else {
            Swal.fire('Lỗi hệ thống', 'Vui lòng thử lại', 'error')
          }
        }
      } else {
        Swal.fire('Lỗi hệ thống', 'Vui lòng thử lại', 'error')
      }
    }
  }
  validate = () => {
    const { userName, phoneNumber, password, verifyPassword } = this.state
    this.setState({
      errName: false,
      errPassword: false,
      errPhoneNumber: false,
      errVerifyPassword: false
    })
    let isValidate = true
    if (!validator.isMobilePhone(phoneNumber)) {
      this.setState({ errPhoneNumber: true })
      isValidate = false
    }
    if (validator.isEmpty(userName) || validator.isEmpty(password)) {
      this.setState({
        errName: true,
        errPassword: true
      })
      isValidate = false
    }
    if (verifyPassword !== password) {
      this.setState({ errVerifyPassword: true })
      isValidate = false
    }
    return isValidate
  }
  render() {
    const {
      userName,
      errName,
      phoneNumber,
      errPhoneNumber,
      password,
      errPassword,
      verifyPassword,
      errVerifyPassword
    } = this.state
    return (
      <Layout>
        <div className={sass.container}>
          <h1 className={sass.title}>Đăng Ký</h1>
          <div className={sass.inputContainer}>
            <TextField
              required
              type="text"
              className={sass.input}
              label="Số điện thoại"
              variant="outlined"
              fullWidth={true}
              name="phoneNumber"
              error={errPhoneNumber}
              value={phoneNumber}
              onChange={this.handleChange('phoneNumber')}
            />
            <TextField
              required
              className={sass.input}
              label="Họ Tên"
              variant="outlined"
              fullWidth={true}
              name="userName"
              error={errName}
              value={userName}
              onChange={this.handleChange('userName')}
            />
            <TextField
              required
              className={sass.input}
              label="Mật khẩu"
              type="password"
              variant="outlined"
              fullWidth={true}
              name="password"
              error={errPassword}
              value={password}
              onChange={this.handleChange('password')}
            />
            <TextField
              required
              className={sass.input}
              label="Nhập lại mật khẩu"
              type="password"
              variant="outlined"
              fullWidth={true}
              name="verifyPassword"
              error={errVerifyPassword}
              value={verifyPassword}
              onChange={this.handleChange('verifyPassword')}
            />
          </div>
          <div className={sass.button}>
            <Button
              classes={{
                root: sass.btnRoot
              }}
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              fullWidth={true}
              onClick={this.handleClick}
            >
              Đăng ký bằng số điện thoại
            </Button>
          </div>
          <div className={`${sass.inputContainer} ${sass.line}`}>
            <div className={sass.lineItem}>
              <hr />
            </div>
            <div className={`${sass.lineItem} ${sass.special}`}>Hoặc</div>
            <div className={sass.lineItem}>
              <hr />
            </div>
          </div>
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
        </div>
      </Layout>
    )
  }
}

export default DangKy
