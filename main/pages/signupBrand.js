import React from 'react'

import SignupForm from '../components/forms/SignupForm'
import Layout from '../components/Layout'

import sass from '../styles/sass/pages/signup_select.scss'

const SignupBrand = props => {
  return (
    <Layout>
      <div className={sass.container}>
        <h2 className={sass.title}>Đăng ký tài khoản trung tâm/chuỗi tiệm</h2>
        <SignupForm type="brand" />
      </div>
    </Layout>
  )
}

export default SignupBrand
