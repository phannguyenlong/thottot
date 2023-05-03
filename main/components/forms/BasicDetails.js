import React from 'react'

import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import { MultipleSelect } from 'react-select-material-ui'
import { specialitiesOptions } from '../../api/constants'

import sass from '../../styles/sass/forms/BasicDetails.scss'

class BasicDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, values, errors } = this.props
    const {
      emailError,
      passwordError,
      passwordVerifyError,
      specialitiesError,
      fullnameError,
      totalBranchError
    } = errors

    return (
      <Grid container spacing={24} className={sass.container}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={emailError !== ''}
            helperText={emailError}
            className={sass.formInput}
            id="email"
            label="Email"
            value={values.email}
            variant="outlined"
            onChange={this.props.onChange('email')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={fullnameError !== ''}
            helperText={fullnameError}
            className={sass.formInput}
            id="fullname"
            label="Họ tên"
            value={values.fullname}
            variant="outlined"
            onChange={this.props.onChange('fullname')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={passwordError !== ''}
            helperText={passwordError}
            className={sass.formInput}
            type="password"
            id="password"
            label="Mật khẩu"
            value={values.password}
            variant="outlined"
            onChange={this.props.onChange('password')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={passwordVerifyError !== ''}
            helperText={passwordVerifyError}
            className={sass.formInput}
            type="password"
            id="passwordVerify"
            label="Nhập lại mật khẩu"
            value={values.passwordVerify}
            variant="outlined"
            onChange={this.props.onChange('passwordVerify')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={sass.formInput}
            id="company"
            label="Tên tiệm/công ty"
            value={values.company}
            variant="outlined"
            onChange={this.props.onChange('company')}
          />
        </Grid>
        {type === 'brand' ? (
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={totalBranchError !== ''}
              helperText={totalBranchError}
              className={sass.formInput}
              label="Số chi nhánh"
              value={values.totalBranch}
              variant="outlined"
              type="number"
              inputProps={{
                min: 1
              }}
              onChange={this.props.onChange('totalBranch')}
            />
          </Grid>
        ) : null}
        <Grid item xs={12} sm={type === 'brand' ? 12 : 6}>
          <MultipleSelect
            required
            error={specialitiesError !== ''}
            helperText={specialitiesError}
            className={sass.formInput}
            value={values.specialities}
            label="Lĩnh vực"
            options={specialitiesOptions}
            onChange={this.props.onChange('specialities')}
            style={{ zIndex: 3 }}
            SelectProps={{
              closeMenuOnSelect: false
            }}
          />
        </Grid>
      </Grid>
    )
  }
}

export default BasicDetails
