// react
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
// material ui
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
// internals
import { Link } from '../../routes'
// styling
import sass from '../../styles/sass/layout/LoginDropdown.scss'
// icons
import customerIcon from '../../static/images/header/customer.svg'
import workerIcon from '../../static/images/header/worker.svg'

class LoginDropdown extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { open } = this.props
    return (
      <Fragment>
        <Button
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.props.onClick}
          classes={{
            root: sass.btnRoot,
            label: sass.btnLbl
          }}
        >
          Đăng nhập
        </Button>
        <Popper
          open={open}
          anchorEl={this.props.anchorEl}
          transition
          disablePortal
          placement={'bottom-end'}
        >
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps} id="menu-list-grow">
              <Paper classes={{ root: sass.cntrPaperRoot }}>
                <ClickAwayListener onClickAway={this.props.onClickAway}>
                  <MenuList classes={{ root: sass.cntrDropdownRoot }}>
                    <Link route="signinWorker">
                      <Button classes={{ root: sass.btnDropdownRoot }}>
                        <img src={workerIcon} width="50px" />
                        <span>Thợ</span>
                      </Button>
                    </Link>
                    <hr style={{ width: '197px' }} />
                    <Link route="dang-nhap">
                      <Button classes={{ root: sass.btnDropdownRoot }}>
                        <img src={customerIcon} width="50px" />
                        <span>Khách hàng</span>
                      </Button>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Fragment>
    )
  }
}

LoginDropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  onClickAway: PropTypes.func.isRequired
}

export default LoginDropdown
