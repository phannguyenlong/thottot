// externals
import Button from '@material-ui/core/Button'
import MediaQuery from 'react-responsive'
import React from 'react'
import logo from '../../static/images/logo.svg'
import { Link } from '../../routes'
import { connect } from 'react-redux'
//internals
import ProfileDropdown from './ProfileDropdown'
import LoginDropdown from './LoginDropdown'
// styling
import sass from '../../styles/sass/layout/Header.scss'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDropdown: false,
      anchorEl: null
    }
  }

  handleDropdownToggle = evt => {
    let { isDropdown } = this.state
    this.setState({ isDropdown: !isDropdown, anchorEl: evt.currentTarget })
  }

  handleDropdownClose = evt => {
    const { anchorEl } = this.state
    if (anchorEl.contains(evt.target)) return
    this.setState({ isDropdown: false, anchorEl: null })
  }

  createMenu = () => {
    const { auth } = this.props
    const { isDropdown, anchorEl } = this.state
    if (auth.isAuthenticated) {
      if (auth.isWorker) {
        const { worker } = this.props
        return (
          <ProfileDropdown
            ref={node => (this.anchorEl = node)}
            avatar={worker.avatar}
            name={worker.fullname}
            isWorker={true}
            open={isDropdown}
            anchorEl={anchorEl}
            onClick={this.handleDropdownToggle}
            onClickAway={this.handleDropdownClose}
          />
        )
      } else {
        const { user } = this.props
        return (
          <ProfileDropdown
            avatar={user.avatarURL}
            name={user.name}
            isWorker={false}
            anchorEl={anchorEl}
            open={isDropdown}
            onClick={this.handleDropdownToggle}
            onClickAway={this.handleDropdownClose}
          />
        )
      }
    } else {
      return (
        <LoginDropdown
          anchorEl={anchorEl}
          open={isDropdown}
          onClick={this.handleDropdownToggle}
          onClickAway={this.handleDropdownClose}
        />
      )
    }
  }

  render() {
    return (
      <div className={sass.container}>
        <div className={sass.child}>
          <div className={sass.logo}>
            <MediaQuery query="(max-device-width: 360px)">
              <Link route="/">
                <img width="80%" height="80%" src={logo} />
              </Link>
            </MediaQuery>
            <MediaQuery query="(min-device-width: 361px)">
              <Link route="/">
                <img width="90%" height="90%" src={logo} />
              </Link>
            </MediaQuery>
          </div>
          <div className={sass.spacing} />
          <div>
            <Link route="postJob">
              <Button
                className={sass.newpost}
                classes={{
                  root: sass.btnRoot,
                  label: sass.btnLbl
                }}
              >
                Đăng tin
              </Button>
            </Link>
            {this.createMenu()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    worker: state.worker
  }
}

export default connect(mapStateToProps)(Header)
