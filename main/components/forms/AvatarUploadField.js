// externals
import React from 'react'
// internals
import ImageUpload from '../ImageUpload'

const AvatarUploadField = ({
  field: { value, name }, // { name, value, onChange, onBlur }
  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => <ImageUpload setBLOB={blob => setFieldValue(name, blob)} {...props} />

export default AvatarUploadField
