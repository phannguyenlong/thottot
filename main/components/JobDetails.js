// reactjs
import React, { Fragment } from 'react'

// constants
import { placeOptions, specialitiesOptions } from '../api/constants'

// @material-ui
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'

// styling
import sass from '../styles/sass/JobDetails.scss'

// custom components
import SpecialityField from './SpecialityField'
import MaterialSelect from './MaterialSelect'

// validator
import validator from 'validator'

// sweetalert
import Swal from 'sweetalert2'

import { postJob } from '../api/API'
import { domain } from '../config/config'

const selectPlaceOptions = placeOptions.map(place => ({
  value: place.value,
  label: place.label,
  options: place.children
}))

const placeRequests = ['Đi đến thợ', 'Thợ tìm đến', 'Cả hai'].map(
  (val, index) => ({
    value: index,
    label: val
  })
)

const paymentTypes = ['Ví điện tử', 'Tiền mặt'].map((val, index) => ({
  value: index,
  label: val
}))

class JobDetails extends React.Component {
  constructor(props) {
    super(props)

    let { category, user } = this.props

    let options = specialitiesOptions[parseInt(category.value)].options

    let speciality = null
    if (options.length > 0) {
      speciality = options[0]
    }

    let placeRequest = placeRequests[0]
    let place = selectPlaceOptions[0].options[0]
    let paymentType = paymentTypes[0]

    this.state = {
      isLoading: false,
      options: options,
      category: parseInt(category.value),
      speciality: speciality,
      name: user.name,
      phone: '',
      shortDescription: '',
      placeRequest: placeRequest,
      paymentType: paymentType,
      place: place,
      address: '',
      description: '',
      errors: {
        speciality: false,
        name: false,
        phone: false,
        shortDescription: false,
        placeRequest: false,
        place: false,
        address: false,
        description: false,
        paymentType: false
      }
    }
  }

  // validations
  validate = jobInfo => {
    let err = null

    let { errors } = this.state

    for (let key in errors) errors[key] = false

    if (jobInfo.description.length > 160) {
      err = new Error('Mô tả yêu cầu quá dài (tối đa 160 kí tự)')
      errors.description = true
    }

    if (jobInfo.address.length > 160) {
      err = new Error('Địa chỉ quá dài (tối đa 160 kí tự)')
      errors.address = true
    }

    if (jobInfo.shortDescription.length > 37) {
      err = new Error('Tên yêu cầu quá dài (tối đa 37 kí tự)')
      errors.shortDescription = true
    }

    if (!validator.isNumeric(jobInfo.phone)) {
      err = new Error('Số điện thoại không hợp lệ')
      errors.phone = true
    }

    for (let key in jobInfo) {
      if (key !== 'description' && key !== 'speciality') {
        if (typeof jobInfo[key] === 'string') {
          if (validator.isEmpty(jobInfo[key])) {
            errors[key] = true
            err = new Error('Chưa điền đủ mục yêu cầu')
          }
        } else if (jobInfo[key] === null) {
          errors[key] = true
          err = new Error('Chưa điền đủ mục yêu cầu')
        }
      }
    }

    this.setState({ errors })

    return err
  }

  postJob = async () => {
    let { user } = this.props
    this.setState({
      isLoading: true
    })
    let {
      speciality,
      category,
      name,
      phone,
      shortDescription,
      placeRequest,
      place,
      address,
      paymentType,
      description
    } = this.state
    let jobInfo = {
      category,
      speciality,
      name,
      phone,
      shortDescription,
      placeRequest,
      place,
      paymentType,
      address,
      description
    }

    jobInfo.speciality = speciality ? speciality.value : null
    jobInfo.placeRequest = placeRequest ? placeRequest.value : null
    jobInfo.paymentType = paymentType ? paymentType.value : null
    jobInfo.place = place ? place.value : null

    let err = this.validate(jobInfo)
    if (err !== null) {
      Swal.fire({
        type: 'error',
        title: 'Không đăng được tin',
        text: err.message
      })
    } else {
      let resp = await postJob(user._id, jobInfo)
      switch (resp.status) {
        case 'success':
          await Swal.fire({
            type: 'success',
            title: 'Đăng tin thành công',
            text: 'Yêu cầu sửa đã được đăng'
          })
          window.location.href = domain
          break
        case 'fail':
          if (resp.payload.message === 'UserNotFound')
            Swal.fire({
              type: 'success',
              title: 'Không đăng được tin',
              text: 'Thông tin người dùng không chính xác'
            })
          break
        default:
          Swal.fire({
            type: 'success',
            title: 'Không đăng được tin',
            text: 'Lỗi hệ thống'
          })
      }
    }

    this.setState({
      isLoading: false
    })
  }

  onChange = input => e => {
    this.setState({
      [input]: e.target ? e.target.value : e
    })
  }

  onChangeOption = input => selected => {
    this.setState({
      [input]: selected
    })
  }

  render() {
    let { category } = this.props
    let {
      isLoading,
      name,
      phone,
      address,
      shortDescription,
      description,
      placeRequest,
      place,
      speciality,
      options,
      paymentType,
      errors
    } = this.state

    const OptionsField = (label, field, options, error, onChange) => (
      <Fragment>
        {label ? (
          <Grid item xs={12} sm={4}>
            <FormLabel
              error={error}
              required={true}
              className={sass.inputLabel}
            >{`${label}:`}</FormLabel>
          </Grid>
        ) : null}
        <Grid item xs={12} sm={8}>
          <MaterialSelect
            required
            className={sass.selectOptions}
            options={options}
            value={field}
            placeholder={'Chọn...'}
            noOptionsMessage={() => 'Chưa có lựa chọn'}
            onChange={onChange}
            isClearable={true}
            isSearchable={true}
          />
        </Grid>
      </Fragment>
    )

    const OutlinedInputField = (label, field, error, onChange) => (
      <Fragment>
        {label ? (
          <Grid item xs={12} sm={4}>
            <FormLabel
              error={error}
              required={true}
              className={sass.inputLabel}
            >{`${label}:`}</FormLabel>
          </Grid>
        ) : null}
        <Grid item xs={12} sm={8}>
          <OutlinedInput
            required={true}
            onChange={onChange}
            classes={{
              notchedOutline: sass.jobTextNotchedOutline
            }}
            defaultValue={field}
            margin="none"
            variant="outlined"
            labelWidth={0}
            fullWidth={true}
          />
        </Grid>
      </Fragment>
    )

    return (
      <div className={sass.container}>
        <div className={sass.upperContainer}>
          <Grid container spacing={32} className={sass.sectionGridContainer}>
            <Hidden xsDown>
              <Grid item sm={4} className={sass.specialityContainer}>
                <SpecialityField
                  options={options}
                  defaultVal={speciality}
                  onChange={this.onChangeOption('speciality')}
                  img={category.img}
                />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={8}>
              <Grid
                container
                className={sass.basicInfoContainer}
                alignItems="center"
                spacing={16}
              >
                <Grid item xs={12}>
                  <Typography
                    className={sass.catLbl}
                    variant="h5"
                    color="primary"
                  >
                    {category.label}
                    <a
                      href="#"
                      className={sass.catReset}
                      onClick={this.props.reset}
                    >
                      Thay đổi
                    </a>
                  </Typography>
                </Grid>
                <Hidden smUp>
                  <Grid item xs={12} className={sass.specialityContainer}>
                    <SpecialityField
                      options={options}
                      defaultVal={speciality}
                      onChange={this.onChange('speciality')}
                      img={category.img}
                    />
                  </Grid>
                </Hidden>
                {OutlinedInputField(
                  'Tên',
                  name,
                  errors.name,
                  this.onChange('name')
                )}
                {OutlinedInputField(
                  'Số điện thoại',
                  phone,
                  errors.phone,
                  this.onChange('phone')
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div className={sass.lowerContainer}>
          <Grid
            container
            className={sass.sectionGridContainer}
            alignItems="center"
            spacing={16}
          >
            {OutlinedInputField(
              'Tên yêu cầu',
              shortDescription,
              errors.shortDescription,
              this.onChange('shortDescription')
            )}
            {OptionsField(
              'Yêu cầu vị trí',
              placeRequest,
              placeRequests,
              errors.placeRequest,
              this.onChangeOption('placeRequest')
            )}
            {OptionsField(
              'Phương thức thanh toán',
              paymentType,
              paymentTypes,
              errors.paymentType,
              this.onChangeOption('paymentType')
            )}
            {OptionsField(
              'Tỉnh/thành - Quận/huyện',
              place,
              selectPlaceOptions,
              errors.place,
              this.onChangeOption('place')
            )}
            {OutlinedInputField(
              'Địa chỉ',
              address,
              errors.address,
              this.onChange('address')
            )}
            <Grid item xs={12}>
              <OutlinedInput
                onChange={this.onChange('description')}
                defaultValue={description}
                placeholder="Bạn có thể mô tả vấn đề rõ hơn để giúp thợ tìm ra lỗi"
                margin="none"
                multiline={true}
                rows={5}
                variant="outlined"
                labelWidth={0}
                fullWidth={true}
              />
            </Grid>
            {/* PLACE IMAGES HERE !!! */}
            {/* <Grid item x={12} style={{ width: '100%' }}>
              <Grid container className={sass.imagesContainer} spacing={16}>
                {values.images.map((img, index) => (
                  <Grid item key={img.id}>
                    <ImageUpload
                      hasCaption
                      aspect={3 / 2}
                      setCaption={this.props.onChangeImageCaption(index)}
                      setBLOB={this.props.onChangeImage(index)}
                      caption={img.caption}
                      initBlob={img.blob}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid> */}
            <Grid container justify="center">
              <Grid item>
                <Button
                  type="submit"
                  className={sass.btnPost}
                  onClick={this.postJob}
                >
                  Đăng tin
                </Button>
                {isLoading ? (
                  <LinearProgress />
                ) : (
                  <LinearProgress variant="determinate" value={100} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default JobDetails
