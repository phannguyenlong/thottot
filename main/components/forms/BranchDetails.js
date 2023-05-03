import React from 'react'

import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import { TimePicker } from 'material-ui-pickers'
import { SingleSelect } from 'react-select-material-ui'

import ImageUpload from '../ImageUpload'

import { placeOptions } from '../../api/constants'
import sass from '../../styles/sass/forms/BranchDetails.scss'

class BranchDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      districtsLabelWidth: 0,
      citiesLabelWidth: 0
    }
  }

  render() {
    const { index, type, values, errors } = this.props
    const {
      branchNameError,
      branchEmailError,
      branchPhoneError,
      openError,
      closeError,
      districtError,
      cityError,
      addressError,
      descriptionError
    } = errors

    return (
      <Grid container spacing={24} className={sass.container}>
        {type === 'brand' ? (
          <React.Fragment>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} className={sass.branchLabel}>
              <FormLabel>Chi nhánh {index}</FormLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={branchNameError !== ''}
                helperText={branchNameError}
                className={sass.formInput}
                label="Tên chi nhánh"
                value={values.branchName}
                variant="outlined"
                onChange={this.props.onChange('branchName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={branchEmailError !== ''}
                helperText={branchEmailError}
                className={sass.formInput}
                label="Email chi nhánh"
                value={values.email}
                variant="outlined"
                onChange={this.props.onChange('branchEmail')}
              />
            </Grid>
          </React.Fragment>
        ) : null}
        <Grid item xs={12}>
          <FormLabel className={sass.formTimeLabel}>
            Thời gian làm việc
          </FormLabel>
        </Grid>
        <Grid item xs={6} sm={3}>
          <TimePicker
            required
            error={openError !== ''}
            helperText={openError}
            variant="outlined"
            clearable
            ampm={false}
            label="Từ"
            value={values.open}
            onChange={this.props.onChange('open')}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TimePicker
            required
            error={closeError !== ''}
            helperText={closeError}
            variant="outlined"
            clearable
            ampm={false}
            label="Đến"
            value={values.close}
            onChange={this.props.onChange('close')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={branchPhoneError !== ''}
            helperText={branchPhoneError}
            className={sass.formInput}
            id="phone"
            label="SĐT"
            value={values.branchPhone}
            variant="outlined"
            onChange={this.props.onChange('branchPhone')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelect
            required
            error={cityError !== ''}
            helperText={cityError}
            className={sass.formInput}
            value={values.city}
            label="Thành phố"
            style={{ zIndex: 2 }}
            options={placeOptions}
            onChange={this.props.onChange('city')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelect
            required
            error={districtError !== ''}
            helperText={districtError}
            className={sass.formInput}
            value={values.district}
            label="Quận/Huyện"
            style={{ zIndex: 2 }}
            SelectProps={{
              msgNoOptionsAvailable: 'Vui lòng chọn thành phố'
            }}
            options={
              values.city ? placeOptions[parseInt(values.city)].children : ''
            }
            onChange={this.props.onChange('district')}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            error={addressError !== ''}
            helperText={addressError}
            className={sass.formInput}
            id="address"
            label="Địa chỉ"
            value={values.address}
            variant="outlined"
            onChange={this.props.onChange('address')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            error={descriptionError !== ''}
            helperText={descriptionError}
            rows={5}
            className={sass.formInput}
            id="description"
            label="Mô tả"
            value={values.description}
            variant="outlined"
            onChange={this.props.onChange('description')}
          />
        </Grid>
        <Grid item x={12} style={{ width: '100%' }}>
          <Grid container className={sass.imagesContainer} spacing={16}>
            {values.images.map((img, index) => (
              <Grid item key={img.id}>
                <ImageUpload
                  hasCaption
                  aspect={3 / 2}
                  setCaption={this.props.onChangeImageCaption(index)}
                  setBLOB={this.props.onChangeImage(index)}
                  caption={img.caption}
                  initBLOB={img.blob}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default BranchDetails
