import React from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import MediaQuery from 'react-responsive'
import sass from '../styles/sass/pages/profile.scss'
// component
import Layout from '../components/Layout'
import ImageUpload from '../components/ImageUpload'
// image
import editIcon from '../static/images/editButton.svg'
// module
import { findUserByFbId, findUserByPhone, updateUser } from '../api/API'
// material UI
import { withStyles, Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

const style = theme => ({
  button: {
    borderRadius: 5
  }
})

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: 'profile',
      fbID: this.props.isAuth ? this.props.fbID : '',
      name: 'Họ và tên',
      gender: 'Giới tính',
      password: 'Mật khẩu',
      phone: 'Số điện thoại (chính)',
      email: 'Email',
      address: 'Địa chỉ',
      avaUrl: '',
      isChangeAvatar: false,
      isLoading: false
    }
  }
  componentDidMount() {
    const { accountType } = this.props
    if (accountType === 'fb') {
      this.getFaceUser().then(data => {
        this.setState({
          phone: data.phone,
          name: data.name,
          gender: data.gender,
          email: data.email,
          address: data.address,
          password: data.password,
          avaUrl: data.avatarUrl
        })
      })
    } else if (accountType === 'phone') {
      this.getPhoneUser().then(data => {
        this.setState({
          phone: data.user.phone,
          name: data.user.name,
          gender: data.user.gender,
          email: data.user.email,
          address: data.user.address,
          password: data.user.password,
          avaUrl: data.user.avatarUrl
        })
      })
    }
  }
  // call and recieve API
  getFaceUser = async () => {
    let resp = await findUserByFbId(this.props.fbID)
    return resp.payload
  }
  getPhoneUser = async () => {
    let resp = await findUserByPhone(this.props.phoneNumber)
    return resp.payload
  }
  handleUpdate = async () => {
    const { accountType } = this.props
    this.setState({ isLoading: true })
    if (accountType === 'fb') {
      let resp = await updateUser('facebook', this.state)
      if (resp.status === 200) {
        Swal.fire('Thay đổi thông tin thành công', '', 'success')
      } else {
        Swal.fire('Có lỗi xảy ra!', '', 'error')
      }
    } else if (accountType === 'phone') {
      let resp = await updateUser('phone', this.state)
      if (resp.status === 200) {
        Swal.fire('Thay đổi thông tin thành công', '', 'success')
      } else {
        Swal.fire('Có lỗi xảy ra!', '', 'error')
      }
    }
    this.setState({ isLoading: false })
  }
  // handle the changes
  handleEdit = async type => {
    if (type === 'name') {
      const { value: name } = await Swal.fire({
        title: 'Thay đổi họ và tên',
        input: 'text',
        inputValue: this.state.name,
        inputPlaceholder: 'Họ và Tên',
        showCancelButton: true,
        showCloseButton: true,
        inputValidator: value => {
          if (!value) {
            return 'Bạn cần phải nhập tên'
          } else {
            this.setState({ name: value })
          }
        }
      })
    }
    if (type === 'gender') {
      const { value: gender } = await Swal.fire({
        title: 'Thay đổi giới tính',
        input: 'radio',
        showCancelButton: true,
        showCloseButton: true,
        inputOptions: { Nam: 'Nam', Nữ: 'Nữ', Khác: 'Khác' },
        inputValidator: value => {
          if (value) {
            this.setState({ gender: value })
          }
        }
      })
    }
    if (type === 'password') {
      const { value: password } = await Swal.fire({
        title: 'Thay đổi mật khẩu',
        html:
          '<label><strong>Mật khẩu cũ</strong></label><input type="password" id="swal-input1" class="swal2-input">' +
          '<label><strong>Mật khẩu mới</strong></label><input type="password" id="swal-input2" class="swal2-input">' +
          '<label><strong>Nhập lại mật khẩu mới</strong></label><input type="password" id="swal-input3" class="swal2-input">',
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value,
            document.getElementById('swal-input3').value
          ]
        }
      })
      if (password) {
        let prevPass = password[0]
        let newPass = password[1]
        let confirmPass = password[2]
        if (prevPass === this.state.password) {
          if (newPass !== confirmPass) {
            Swal.fire('Xác nhận Password không đúng', '', 'error')
          } else {
            this.setState({ password: newPass })
            Swal.fire('Đổi mật khẩu thành công', '', 'success')
          }
        } else {
          Swal.fire('Password cũ không đúng', '', 'error')
        }
      }
    }
    if (type === 'phone') {
      const { value: phone } = await Swal.fire({
        title: 'Thay đổi Số điện thoại',
        input: 'text',
        inputValue: this.state.phone,
        inputPlaceholder: 'Số điện thoại',
        showCancelButton: true,
        showCloseButton: true,
        inputValidator: value => {
          if (!value) {
            return 'Bạn cần phải nhập Số điện thoại'
          } else {
            this.setState({ phone: value })
          }
        }
      })
    }
    if (type === 'email') {
      const { value: name } = await Swal.fire({
        title: 'Thay đổi địa chỉ Email',
        input: 'text',
        inputValue: this.state.email,
        inputPlaceholder: 'Địa chỉ email',
        showCancelButton: true,
        showCloseButton: true,
        inputValidator: value => {
          if (value) {
            this.setState({ email: value })
          }
        }
      })
    }
    if (type === 'address') {
      const { value: name } = await Swal.fire({
        title: 'Thay đổi Địa chỉ',
        input: 'text',
        inputValue: this.state.address,
        inputPlaceholder: 'Địa chỉ',
        showCancelButton: true,
        showCloseButton: true,
        inputValidator: value => {
          if (value) {
            this.setState({ address: value })
          }
        }
      })
    }
  }
  onChangeAvatar = blob => {
    this.setState({
      avatar: blob,
      isChangeAvatar: true
    })
  }
  content = () => {
    const { accountType } = this.props
    const {
      name,
      gender,
      address,
      email,
      phone,
      avaUrl,
      isLoading
    } = this.state
    return (
      <div>
        <div className={sass.sectionTitle}>
          <h2>Thay đổi thông tin người dùng</h2>
          <p>Thông tin cơ bản, họ tên, địa chỉ, ảnh đại diện của bạn</p>
        </div>
        <div className={sass.imageUpload}>
          <div className={sass.image}>
            <ImageUpload setBLOB={this.onChangeAvatar} />
            <img className="userImage" src={avaUrl} width="200px" />
          </div>
          <div className={sass.imageText}>
            <h2>Chọn ảnh đại diện</h2>
            <p>ảnh đại diện sẽ giúp cá nhân hóa tài khoản của bạn</p>
            {accountType === 'phone' ? (
              <MediaQuery query="(min-device-width: 500px)">
                <Button variant="contained" color="primary" fullWidth={false}>
                  <div className={sass.buttonText}>
                    Kết nối với tài khoản facebook
                  </div>
                </Button>
              </MediaQuery>
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className={sass.dataContainer}>
          <div
            onClick={() => this.handleEdit('name')}
            className={sass.dataField}
          >
            <div>{name !== undefined ? name : 'Họ và Tên'}</div>
            <img src={editIcon} />
          </div>
          <div
            onClick={() => this.handleEdit('gender')}
            className={sass.dataField}
          >
            <div>{gender !== undefined ? gender : 'Giới tính'}</div>
            <img src={editIcon} />
          </div>
          {accountType === 'phone' ? (
            <div
              onClick={() => this.handleEdit('password')}
              className={sass.dataField}
            >
              <div>*******</div>
              <img src={editIcon} />
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className={sass.sectionTitle}>
          <h2>Thay đổi thông tin liên lạc</h2>
          <p>Thông tin liên lạc, số điện thoại, địa chỉ email của bạn</p>
        </div>
        <div className={sass.dataContainer}>
          <div
            onClick={() => this.handleEdit('phone')}
            className={sass.dataField}
          >
            <div>{phone !== undefined ? phone : 'Số điện thoại'}</div>
            <img src={editIcon} />
          </div>
          <div
            onClick={() => this.handleEdit('email')}
            className={sass.dataField}
          >
            <div>{email !== undefined ? email : 'Email'}</div>
            <img src={editIcon} />
          </div>
          <div
            onClick={() => this.handleEdit('address')}
            className={sass.dataField}
          >
            <div>
              {address !== undefined
                ? address.length <= 30
                  ? address
                  : address.slice(0, 30) + '...'
                : 'Địa chỉ'}
            </div>
            <img src={editIcon} />
          </div>
        </div>
        <div className={sass.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            onClick={() => this.handleUpdate()}
          >
            <div className={sass.buttonText}>Lưu Thay Đổi</div>
          </Button>
          {isLoading && (
            <CircularProgress size={24} className={sass.buttonProgress} />
          )}
        </div>
        {accountType === 'phone' ? (
          <MediaQuery query="(max-device-width: 499px)">
            <div className={sass.line}>
              <div className={sass.lineItem}>
                <hr />
              </div>
              <div className={`${sass.lineItem} ${sass.special}`}>Hoặc</div>
              <div className={sass.lineItem}>
                <hr />
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              classes={sass.faceButton}
            >
              <div className={sass.buttonText}>
                Kết nối với tài khoản facebook
              </div>
            </Button>
          </MediaQuery>
        ) : (
          <div />
        )}
        <style jsx>{`
          .userImage {
            position: absolute;
            pointer-events: none;
            top: 0px;
            left: 0px;
            display: ${this.state.isChangeAvatar ? 'none' : 'div'};
          }
        `}</style>
      </div>
    )
  }
  render() {
    return (
      <Layout>
        <div className={sass.container}>{this.content()}</div>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated,
    phoneNumber: state.user.phone,
    fbID: state.user.fbID,
    accountType: state.user.accountType
  }
}

export default connect(mapStateToProps)(withStyles(style)(Profile))
