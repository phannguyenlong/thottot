import React from 'react'
import TextField from '@material-ui/core/TextField'
import sass from '../../styles/sass/forms/WorkerUpdateField.scss'

const WorkerUpdateField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, isSubmitting }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <TextField
      InputLabelProps={{
        classes: {
          root: sass.inputLabel
        }
      }}
      type="text"
      fullWidth={true}
      error={errors[field.name] && touched[field.name]}
      helperText={errors[field.name]}
      disabled={isSubmitting}
      {...field}
      {...props}
    />
  </div>
)

export default WorkerUpdateField
