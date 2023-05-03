import React from 'react'

import SignupForm from '../components/forms/SignupForm'
import Layout from '../components/Layout'

import sass from '../styles/sass/pages/signup_select.scss'

const SignupIndividual = props => {
  return (
    <Layout>
      <div className={sass.container}>
        <h2 className={sass.title}>Đăng ký tài khoản thợ cá nhân</h2>
        <SignupForm type="individual" />
      </div>
    </Layout>
  )
}

export default SignupIndividual
