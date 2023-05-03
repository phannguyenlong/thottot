import React from 'react'

import Grid from '@material-ui/core/Grid'

import { Link } from '../routes'
import Layout from '../components/Layout'

import svgPersonal from '../static/images/signup_person.svg'
import svgCompany from '../static/images/signup_company.svg'

import sass from '../styles/sass/pages/signup.scss'

class Signup extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <div className={sass.container}>
          <Grid
            container
            spacing={32}
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item>
              <h2 className={sass.title}>Đăng ký tài khoản thợ</h2>
            </Grid>
            <Grid item>
              <span>Tài khoản của bạn thuộc hình thức nào?</span>
            </Grid>
            <Grid item className={sass.selection}>
              <Grid
                container
                alignItems="center"
                justify="space-around"
                spacing={16}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={`
                    ${sass.selectionSection}
                    ${sass.selectionSectionRightBorder}
                  `}
                >
                  <Link route="signupIndividual">
                    <a>
                      <img
                        src={svgPersonal}
                        alt="personal signup logo"
                        className={sass.selectionLogo}
                      />
                    </a>
                  </Link>
                  <Link route="signupIndividual">
                    <a className={sass.signupLink}>
                      <span className={sass.selectionTitle}>
                        Thợ cá nhân/tiệm nhỏ
                      </span>
                    </a>
                  </Link>
                </Grid>
                <Grid item xs={12} md={6} className={sass.selectionSection}>
                  <Link route="signupBrand">
                    <a>
                      <img
                        src={svgCompany}
                        alt="company signup logo"
                        className={sass.selectionLogo}
                      />
                    </a>
                  </Link>
                  <Link route="signupBrand">
                    <a className={sass.signupLink}>
                      <span className={sass.selectionTitle}>
                        Trung tâm/chuỗi tiệm
                      </span>
                    </a>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Layout>
    )
  }
}

export default Signup
