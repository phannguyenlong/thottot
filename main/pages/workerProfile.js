// externals
import React from 'react'
import { Formik } from 'formik'
import Swal from 'sweetalert2'
// internals
import { workerUpdateSchema } from '../components/forms/ValidationSchemas'
import Layout from '../components/Layout'
import WorkerUpdate from '../components/forms/WorkerUpdate'
import withAuth from '../components/withAuth'
// apis
import { workerUploadAvatar, workerUpdateByID } from '../api/workers'
// styling
import sass from '../styles/sass/pages/workerProfile.scss'

class WorkerProfile extends React.Component {
  constructor(props) {
    super(props)
    this.uploadAvatarRef = React.createRef()
    this.state = {
      open: false
    }
  }

  handleClickAvatarUpload = evt => {
    this.uploadAvatarRef.current.click()
  }

  handleOpenDialog = values => e => {
    for (const key in values) {
      const val = values[key]
      if (val !== undefined && val !== '') {
        this.setState({ open: true })
      }
    }
  }

  handleCloseDialog = () => {
    this.setState({ open: false })
  }

  render() {
    const { worker } = this.props
    const { open } = this.state
    return (
      <Layout>
        <div className={sass.container}>
          <Formik
            validationSchema={workerUpdateSchema}
            validateOnChange={false}
            initialValues={{
              avatarBLOB: undefined,
              fullname: '',
              ID: '',
              email: '',
              phone: '',
              password: '',
              passwordConfirm: '',
              passwordVerify: ''
            }}
            onSubmit={(values, { setSubmitting }) => {
              const success = () => {
                this.setState({ open: false })
                Swal.fire('Thay đổi thông tin thành công', '', 'success').then(
                  () => setSubmitting(false)
                )
              }
              const unsuccess = (payload, error) => {
                this.setState({ open: false })
                let message
                if (payload) {
                  message = 'Thông tin tài khoản không chính xác!'
                } else {
                  message = 'Có lỗi xảy ra!'
                }
                Swal.fire(
                  'Thay đổi thông tin không thành công',
                  message,
                  'error'
                ).then(() => setSubmitting(false))
              }
              workerUpdateByID(worker._id, values).then(data => {
                let updatedWorker = undefined
                if (data.status === 'success') {
                  updatedWorker = data.payload.worker
                  if (values.avatarBLOB) {
                    workerUploadAvatar(
                      updatedWorker._id,
                      values.avatarBLOB,
                      updatedWorker.email
                    ).then(data => {
                      if (data.status === 'success') {
                        updatedWorker = data.payload.worker
                        success()
                      } else {
                        unsuccess(data.payload, data.error)
                      }
                    })
                  } else success()
                } else unsuccess(data.payload, data.error)
              })
            }}
            render={props => (
              <WorkerUpdate
                worker={worker}
                open={open}
                handleOpenDialog={this.handleOpenDialog}
                handleCloseDialog={this.handleCloseDialog}
                {...props}
              />
            )}
          />
        </div>
      </Layout>
    )
  }
}

export default withAuth({ isWorker: true })(WorkerProfile)
