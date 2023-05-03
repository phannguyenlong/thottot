import * as Yup from 'yup'
import validator from 'validator'

export const workerUpdateSchema = Yup.object().shape({
  fullname: Yup.string(),
  email: Yup.string().email('Email không hợp lệ'),
  phone: Yup.string().test('phone', 'Số điện thoại không hợp lệ', value => {
    if (value === undefined) return true
    return validator.isMobilePhone(value)
  }),
  ID: Yup.string().matches(/[0-9]{9,11}/, 'Số CMND không hợp lệ'),
  password: Yup.string().min(6, 'Yêu cầu mật khẩu dài từ 6 ký tự'),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password')],
    'Mật khẩu xác nhận không khớp'
  ),
  passwordVerify: Yup.string()
})
