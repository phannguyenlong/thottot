import React from 'react'
import Layout from '../components/Layout'
import Grid from '@material-ui/core/Grid'
import sass from '../styles/sass/pages/lien-he.scss'
import Banner from '../static/images/contact-us/banner.png'
import gmailIcon from '../static/images/contact-us/gmailIcon.png'
import facebookIcon from '../static/images/contact-us/facebookIcon.png'
import youtubeIcon from '../static/images/contact-us/youtubeIcon.png'

class LienHe extends React.Component {
  render() {
    return (
      <Layout>
        <div className={sass.container}>
          <h1 className={sass.title}>
            <center>LIÊN HỆ CHÚNG TÔI QUA</center>
          </h1>
          <Grid container spacing={5}>
            <Grid xs={12} sm={6} md={6}>
              <a href="https://www.facebook.com/tot.tho.98">
                <div className={sass.inforContainer}>
                  <img src={facebookIcon} className={sass.images} />
                  <h1>fb.com/tot.tho.98</h1>
                </div>
              </a>

              <div className={sass.inforContainer}>
                <img src={gmailIcon} className={sass.images} />
                <h1>thotot.biz@gmail.com</h1>
              </div>
              <div className={sass.inforContainer}>
                <img src={youtubeIcon} className={sass.images} />
                <h1>/thototbiz</h1>
              </div>
            </Grid>
            <Grid xs={12} sm={6} md={6}>
              <img src={Banner} className={sass.Banner} />
            </Grid>
          </Grid>
        </div>
      </Layout>
    )
  }
}
export default LienHe
