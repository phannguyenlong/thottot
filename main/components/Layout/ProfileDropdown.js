// react
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
// material ui
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import MediaQuery from 'react-responsive'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
// internals
import { Link } from '../../routes'
// styling
import sass from '../../styles/sass/layout/ProfileDropdown.scss'
import noAvaIcon from '../../static/images/header/avaIcon.svg'

class ProfileDropdown extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { avatar, name, isWorker, open } = this.props
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
          <div className={sass.btnLblCnt}>
            <img src={avatar ? avatar : noAvaIcon} width="40" height="40" />
            <div className={sass.btnLblMarginer} />
            <div>{`Chào, ${name
              .split(' ')
              .slice(-1)
              .join(' ')}`}</div>
          </div>
        </Button>
        <Popper
          open={open}
          anchorEl={this.props.anchorEl}
          transition
          disablePortal
          placement={'bottom-end'}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'right top' : 'right top'
              }}
            >
              <Paper classes={{ root: sass.cntrPaperRoot }}>
                <ClickAwayListener onClickAway={this.props.onClickAway}>
                  <MenuList classes={{ root: sass.cntrDropdownRoot }}>
                    <Link route={isWorker ? 'workerProfile' : 'profile'}>
                      <MenuItem classes={{ root: sass.btnDropdownRoot }}>
                        <div>Thay đổi thông tin</div>
                      </MenuItem>
                    </Link>
                    {!isWorker ? (
                      <Link route="thong-bao">
                        <MenuItem classes={{ root: sass.btnDropdownRoot }}>
                          <div>Thông báo *</div>
                        </MenuItem>
                      </Link>
                    ) : null
                    /*(
                      <Link route="branchesProfile">
                        <MenuItem classes={{ root: sass.btnDropdownRoot }}>
                          <div>Thông tin cửa hàng</div>
                        </MenuItem>
                      </Link>
                    )*/
                    }
                    <MediaQuery query="(max-device-width: 1088px)">
                      <Link route="postJob">
                        <MenuItem classes={{ root: sass.btnDropdownRoot }}>
                          <div>Đăng tin</div>
                        </MenuItem>
                      </Link>
                    </MediaQuery>
                    <Link route="/logout">
                      <MenuItem classes={{ root: sass.btnDropdownRoot }}>
                        <div>Đăng xuất</div>
                      </MenuItem>
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

ProfileDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isWorker: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  onClickAway: PropTypes.func.isRequired
}

export default ProfileDropdown
