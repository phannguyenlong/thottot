import React from 'react'

import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'

import Swal from 'sweetalert2'

import validator from 'validator'

import BranchDetails from './BranchDetails'
import BasicDetails from './BasicDetails'
import ImageUpload from '../ImageUpload'

import { workerRegister } from '../../api/workers'

import sass from '../../styles/sass/forms/Signup.scss'

class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.imagesCount = 0
    this.branchCount = 0
    this.avatarClickRef = React.createRef()
    this.initialState = {
      isLoading: false,
      avatar: null,
      type: this.props.type,
      email: '',
      fullname: '',
      password: '',
      passwordVerify: '',
      company: '',
      specialities: [], // Can have multiple specialities
      totalBranch: 1,
      branch: [
        {
          id: this.branchCount,
          images: [{ id: this.imagesCount, blob: null, caption: '' }],
          branchName: '',
          branchEmail: '',
          branchPhone: '',
          open: null, // time string
          close: null, // time string
          district: null,
          city: null,
          description: ''
        }
      ],
      errors: {
        emailError: '',
        passwordError: '',
        passwordVerifyError: '',
        specialitiesError: '',
        fullnameError: '',
        totalBranchError: ''
      },
      branchErrors: [
        {
          branchNameError: '',
          branchEmailError: '',
          branchPhoneError: '',
          openError: '',
          closeError: '',
          districtError: '',
          cityError: '',
          addressError: '',
          descriptionError: ''
        }
      ]
    }
    this.state = this.initialState
  }

  signup = async e => {
    this.setState({
      isLoading: true
    })
    e.preventDefault()
    if (this.validate()) {
      const {
        email,
        password,
        fullname,
        avatar,
        type,
        branch,
        specialities
      } = this.state

      let branches = []
      branch.map(b => {
        const { id: undefined, ...data } = b
        branches.push(data)
      })

      const reqData = {
        email,
        password,
        fullname,
        avatar,
        type,
        specialities,
        branches
      }

      let err = await workerRegister(reqData)
      if (err) {
        if (err.name === 'ValidationError') {
          Swal.fire({
            type: 'error',
            title: 'Không tạo được tài khoản',
            text: 'Địa chỉ email đã tồn tại'
          })
        } else {
          Swal.fire({
            type: 'error',
            title: 'Không tạo được tài khoản',
            text: err.message
          })
        }
      } else {
        await Swal.fire({
          type: 'success',
          title: 'Đăng ký tài khoản thành công'
        })
        window.location.href = '/tho-dang-nhap'
      }
    }
    this.setState({
      isLoading: false
    })
  }

  validate = () => {
    const {
      type,
      avatar,
      email,
      fullname,
      password,
      passwordVerify,
      specialities,
      branch,
      totalBranch,
      errors,
      branchErrors
    } = this.state

    let emptyFields = false
    let invalidEmail = false
    let invalidPassVerify = false
    let invalidPhone = false
    let invalidTotalBranch = false
    let longDesc = false

    if (
      email === '' ||
      fullname === '' ||
      password === '' ||
      passwordVerify === '' ||
      specialities.length === 0
    )
      emptyFields = true
    errors.emailError = email ? '' : 'Yêu cầu'
    errors.fullnameError = fullname ? '' : 'Yêu cầu'
    errors.passwordError = password ? '' : 'Yêu cầu'
    errors.passwordVerifyError = passwordVerify ? '' : 'Yêu cầu'
    errors.specialitiesError = specialities.length !== 0 ? '' : 'Yêu cầu'

    if (!validator.isEmail(email)) {
      errors.emailError = 'Không hợp lệ'
      invalidEmail = true
    } else errors.emailError = ''

    if (password !== passwordVerify) {
      errors.passwordVerifyError = 'Không hợp lệ'
      invalidPassVerify = true
    } else errors.passwordVerifyError = ''

    if (totalBranch < 1) {
      errors.totalBranchError = 'Không hợp lệ'
      invalidTotalBranch = true
    } else errors.totalBranchError = ''
    for (let i = 0; i < branch.length; ++i) {
      if (
        branch[i].branchPhone === '' ||
        branch[i].open === '' ||
        branch[i].close === '' ||
        branch[i].city === '' ||
        branch[i].district === '' ||
        branch[i].address === '' ||
        branch[i].description === ''
      )
        emptyFields = true
      branchErrors[i].branchPhoneError = branch[i].branchPhone ? '' : 'Yêu cầu'
      branchErrors[i].openError = branch[i].open ? '' : 'Yêu cầu'
      branchErrors[i].closeError = branch[i].close ? '' : 'Yêu cầu'
      branchErrors[i].cityError = branch[i].city ? '' : 'Yêu cầu'
      branchErrors[i].districtError = branch[i].district ? '' : 'Yêu cầu'
      branchErrors[i].addressError = branch[i].address ? '' : 'Yêu cầu'
      branchErrors[i].descriptionError = branch[i].description ? '' : 'Yêu cầu'

      if (type === 'brand') {
        if (branch[i].branchName === '' || branch[i].branchEmail === '')
          emptyFields = true
        branchErrors[i].branchNameError = branch[i].branchName ? '' : 'Yêu cầu'
        branchErrors[i].branchEmailError = branch[i].branchEmail
          ? 'Yêu cầu'
          : ''
        if (!validator.isEmail(branch[i].branchEmail)) {
          branchErrors[i].branchEmailError = 'Không hợp lệ'
          invalidEmail = true
        } else branchErrors[i].branchEmailError = ''
      }

      if (!validator.isMobilePhone(branch[i].branchPhone)) {
        branchErrors[i].branchPhoneError = 'Không hợp lệ'
        invalidPhone = true
      } else branchErrors[i].branchPhoneError = ''

      if (branch[i].description.length > 300) {
        branchErrors[i].descriptionError = 'Không hợp lệ'
        longDesc = true
      } else branchErrors[i].descriptionError = ''
    }

    this.setState({ errors, branchErrors })
    if (emptyFields) {
      Swal.fire({
        type: 'error',
        title: 'Chưa điền đủ mục',
        text: 'Mời bạn điền đầy đủ các mục yêu cầu!'
      })
      return false
    }
    if (invalidEmail) {
      Swal.fire({
        type: 'error',
        title: 'Địa chỉ email không hợp lệ',
        text: 'Mời bạn thay đổi địa chỉ email'
      })
      return false
    }
    if (invalidPassVerify) {
      Swal.fire({
        type: 'error',
        title: 'Mật khẩu chưa khớp',
        text: 'Mời bạn xác nhận lại mật khẩu!'
      })
      return false
    }
    if (invalidTotalBranch) {
      Swal.fire({
        type: 'error',
        title: 'Số chi nhánh không hợp lệ',
        text: 'Mời bạn nhập lại số chi nhánh'
      })
      return false
    }
    if (invalidPhone) {
      Swal.fire({
        type: 'error',
        title: 'Số điện thoại không hợp lệ',
        text: 'Mòi bạn thay đổi số điện thoại'
      })
      return false
    }
    if (longDesc) {
      Swal.fire({
        type: 'error',
        title: 'Mô tả quá dài',
        text: 'Mời bạn rút ngắn lại dưới 300 ký tự!'
      })
      return false
    }
    if (avatar == null) {
      Swal.fire({
        type: 'error',
        title: 'Chưa có ảnh đại diện',
        text: 'Mời bạn tải lên ảnh đại diện'
      })
      return false
    }

    return true
  }

  onClickAvatarButton = e => {
    e.preventDefault()
    this.avatarClickRef.current.click()
  }

  // update state according to form
  onChange = input => e => {
    this.setState({
      [input]: e.target ? e.target.value : e
    })
    if (input === 'totalBranch') this.onChangeTotalBranch(e.target.value)
  }

  onChangeBranch = index => input => e => {
    let { branch } = this.state
    if (e.target) branch[index][input] = e.target.value
    else branch[index][input] = e
    this.setState({
      branch: branch
    })
  }

  onChangeTotalBranch = totalBranch => {
    let { branch, branchErrors } = this.state
    let n = branch.length
    if (totalBranch < n) {
      branch.splice(totalBranch, n - totalBranch)
      branchErrors.splice(totalBranch, n - totalBranch)
    } else {
      for (let i = n; i < totalBranch; i++) {
        this.branchCount++
        branch.push({
          id: this.branchCount,
          images: [{ id: this.imagesCount, blob: null, caption: '' }],
          branchName: '',
          branchEmail: '',
          branchPhone: '',
          open: null, // time string
          close: null, // time string
          district: null,
          city: null,
          address: '',
          description: ''
        })
        branchErrors.push({
          branchNameError: '',
          branchEmailError: '',
          branchPhoneError: '',
          openError: '',
          closeError: '',
          districtError: '',
          cityError: '',
          addressError: '',
          descriptionError: ''
        })
      }
    }
    this.setState({
      branch: branch,
      branchErrors: branchErrors
    })
  }

  onChangeBranchImage = branchIndex => index => blob => {
    let { branch } = this.state
    let { images } = branch[branchIndex]
    if (index === images.length - 1 && images.length < 5) {
      this.imagesCount++
      images.push({ id: this.imagesCount, blob: null, caption: '' })
    }
    if (images[index]) {
      images[index].blob = blob
    }
    branch[branchIndex].images = images
    this.setState({ branch })
  }

  onChangeBranchImageCaption = branchIndex => index => val => {
    let { branch } = this.state
    let { images } = branch[branchIndex]
    if (images[index]) {
      images[index].caption = val
    }
    branch[branchIndex].images = images
    this.setState({ branch })
  }

  onChangeAvatar = blob => {
    this.setState({
      avatar: blob
    })
  }

  render() {
    const {
      isLoading,
      type,
      email,
      fullname,
      password,
      passwordVerify,
      company,
      specialities,
      totalBranch,
      branch,
      errors,
      branchErrors
    } = this.state
    const values = {
      email,
      fullname,
      password,
      passwordVerify,
      company,
      specialities,
      totalBranch
    }

    return (
      <form className={sass.container}>
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={8}
          direction="column"
          className={sass.formContainer}
        >
          <Grid item>
            <FormLabel>Chọn ảnh đại diện</FormLabel>
          </Grid>
          <Grid item>
            <ImageUpload
              clickRef={this.avatarClickRef}
              setBLOB={this.onChangeAvatar}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={this.onClickAvatarButton}
              className={sass.btnAvatar}
            >
              Tải lên ảnh
            </Button>
          </Grid>
          <Grid item>
            <Grid container spacing={16} alignItems="center">
              <Grid item xs={12}>
                <BasicDetails
                  onChange={this.onChange}
                  type={type}
                  values={values}
                  branch={branch}
                  errors={errors}
                  branchErrors={branchErrors}
                />
              </Grid>
              {branch.map((b, index) => (
                <Grid item xs={12} key={b.id}>
                  <BranchDetails
                    onChange={this.onChangeBranch(index)}
                    onChangeImage={this.onChangeBranchImage(index)}
                    onChangeImageCaption={this.onChangeBranchImageCaption(
                      index
                    )}
                    index={index + 1}
                    type={type}
                    values={b}
                    errors={branchErrors[index]}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              className={sass.btnSignup}
              onClick={this.signup}
            >
              Đăng ký
            </Button>
            {isLoading ? (
              <LinearProgress />
            ) : (
              <LinearProgress variant="determinate" value={100} />
            )}
          </Grid>
        </Grid>
      </form>
    )
  }
}

export default SignupForm
