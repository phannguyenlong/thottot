// externals
import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Form, Field } from 'formik'
// internals
import WorkerUpdateField from './WorkerUpdateField'
import AvatarUploadField from './AvatarUploadField'
// styling
import sass from '../../styles/sass/forms/WorkerUpdate.scss'

const WorkerUpdate = ({
  handleSubmit,
  values,
  handleOpenDialog,
  handleCloseDialog,
  open,
  worker
}) => {
  let avatarRef = React.createRef()

  const handleClickAvatarUpload = () => {
    avatarRef.current.click()
  }

  return (
    <Form className={sass.formContainer}>
      <h2 className={sass.title}>Thông tin cá nhân</h2>
      <Grid className={sass.imgContainer} container spacing={24}>
        <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
          <Field
            className={sass.imgAvatar}
            initURL={worker.avatar}
            clickRef={avatarRef}
            name="avatarBLOB"
            component={AvatarUploadField}
          />
        </Grid>
        <Grid item>
          <div className={sass.imgDesc}>
            <h3 className={sass.imgDescTitle}>Chọn ảnh đại diện</h3>
            <p className={sass.imgDescSubTitle}>
              ảnh đại diện sẽ giúp cá nhân hoá tài khoản của bạn
            </p>
            <Button
              className={sass.imgUploadButton}
              classes={{
                root: sass.btnRoot,
                label: sass.btnLbl
              }}
              onClick={handleClickAvatarUpload}
            >
              Tải lên hình ảnh
            </Button>
          </div>
        </Grid>
      </Grid>
      <Field
        className={sass.formField}
        placeholder={worker.fullname || 'Chưa có'}
        label="Họ và tên"
        name="fullname"
        variant="outlined"
        component={WorkerUpdateField}
      />
      <Field
        className={sass.formField}
        placeholder={worker.ID || 'Chưa có'}
        label="Số CMND"
        name="ID"
        variant="outlined"
        component={WorkerUpdateField}
      />
      <Field
        className={sass.formField}
        type="password"
        label="Mật khẩu mới"
        name="password"
        variant="outlined"
        component={WorkerUpdateField}
      />
      <Field
        className={sass.formField}
        type="password"
        label="Xác nhận mật khẩu mới"
        name="passwordConfirm"
        variant="outlined"
        component={WorkerUpdateField}
      />
      <h2 className={sass.title}>Thông tin liên lạc</h2>
      <Field
        className={sass.formField}
        placeholder={worker.email || 'Chưa có'}
        label="Email"
        name="email"
        variant="outlined"
        component={WorkerUpdateField}
      />
      <Field
        className={sass.formField}
        placeholder={worker.phone || 'Chưa có'}
        label="Số điện thoại"
        name="phone"
        variant="outlined"
        component={WorkerUpdateField}
      />
      <Button
        classes={{
          root: sass.btnRoot,
          label: sass.btnLbl
        }}
        className={sass.formBtnDialog}
        onClick={handleOpenDialog(values)}
      >
        Thay đổi
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-localledby="cropDialogTitle"
      >
        <DialogTitle id="cropDialogTitle" disableTypography>
          <Typography variant="h5">Xác nhận mật khẩu</Typography>
        </DialogTitle>
        <DialogContent>
          <Field
            className={sass.formField}
            type="password"
            placeholder="Mật khẩu hiện tại"
            name="passwordVerify"
            variant="outlined"
            component={WorkerUpdateField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Lưu thay đổi</Button>
        </DialogActions>
      </Dialog>
    </Form>
  )
}

export default WorkerUpdate
