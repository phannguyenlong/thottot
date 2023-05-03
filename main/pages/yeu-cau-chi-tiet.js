import React from 'react'
import Layout from '../components/Layout'
import { connect } from 'react-redux'
import Carousel from 'react-slick'
// material ui
import Button from '@material-ui/core/Button'
// images
import optionIcon from '../static/images/xem-tin-chi-tiet/optionIcon.svg'
import placeIcon from '../static/images/xem-tin-chi-tiet/placeIcon.svg'
import paymentIcon from '../static/images/xem-tin-chi-tiet/paymentIcon.svg'
// apis
import { getJobBySlug } from '../api/API'
import { placeOptions, specialitiesOptions } from '../api/constants'
// style
import sass from '../styles/sass/pages/yeu-cau-chi-tiet.scss'

class YeuCauChiTiet extends React.Component {
  static async getInitialProps(props) {
    let { query } = props.ctx
    let data = await getJobBySlug({ slug: query.slug })
    return { jobData: data.payload }
  }
  constructor(props) {
    super(props)
    this.state = {
      jobData: this.props.jobData,
      branchImage: [
        {
          url:
            'https://images.techhive.com/images/article/2015/04/broken-laptop-screen-100577771-orig.png',
          caption: 'Màn hình bị bể'
        },
        {
          url:
            'https://www.howtogeek.com/wp-content/uploads/2013/05/xbroken-laptop.jpg.pagespeed.gp+jp+jw+pj+ws+js+rj+rp+rw+ri+cp+md.ic.DU2h_Ha6l8.jpg',
          caption: 'Xuất hiện một trắng to ngay góc phải'
        }
      ],
      branchTag: ['Laptop']
    }
  }
  createImage(items) {
    return items.map(item => (
      <div key={item._id}>
        <div className={sass.carouselImageContainer}>
          <img className={sass.carouselImage} src={item.url} />
          {item.caption ? (
            <div className={sass.legend}>{item.caption}</div>
          ) : (
            <div />
          )}
        </div>
      </div>
    ))
  }
  createTag(items) {
    return items.map(item => (
      <div key={item.name}>
        <div className={sass.tag}>{item}</div>
      </div>
    ))
  }
  render() {
    const { jobData } = this.state
    console.log(jobData)
    let specialitiesFields = []
    let categoryIndex = parseInt(jobData.speciality.slice(0, -2))
    let specIndex = parseInt(jobData.speciality.slice(-2))
    specialitiesFields.push(
      specialitiesOptions[categoryIndex].options[specIndex].label
    )
    let placeDisplay = `${
      placeOptions[
        jobData.place.length === 3
          ? Number(jobData.place.slice(0, 1))
          : Number(jobData.place.slice(0, 2))
      ].children.filter(place => {
        return place.value === jobData.place
      })[0].label
    },${
      placeOptions[
        jobData.place.length === 3
          ? Number(jobData.place.slice(0, 1))
          : Number(jobData.place.slice(0, 2))
      ].label
    }`
    let optionDisplay = 'Cả 2'
    if (jobData.placeRequest === 0) {
      optionDisplay = 'Thợ tìm đến'
    } else if (jobData.placeRequest === 1) {
      optionDisplay = 'Đi đến thợ'
    }
    return (
      <Layout>
        <div className={sass.container}>
          <div className={sass.jobContainer}>
            <div className={sass.jobShortDescription}>
              {jobData.shortDescription}
            </div>
            <div className={sass.carouselContainer}>
              <div className={sass.carousel}>
                <Carousel
                  dots={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  swipeToSlide={true}
                  autoplay={true}
                  autoplaySpeed={5000}
                  pauseOnHover={true}
                >
                  {this.createImage(this.state.branchImage)}
                </Carousel>
              </div>
              <div className={sass.tagContainer}>
                {this.createTag(specialitiesFields)}
              </div>
              <div className={sass.descriptionContainer}>
                <div className={sass.descriptionItem}>
                  <img src={optionIcon} />
                  <div>Yêu cầu vị trí: {optionDisplay}</div>
                </div>
                <div className={sass.descriptionItem}>
                  <img src={placeIcon} />
                  <div>{placeDisplay}</div>
                </div>
                <div className={sass.descriptionItem}>
                  <img src={paymentIcon} />
                  <div>
                    {jobData.paymentType === 0 ? 'Chuyển khoản' : 'Tiền mặt'}
                  </div>
                </div>
                <div className={sass.fullDescription}>
                  {jobData.description}
                </div>
                <div className={sass.button}>
                  <Button
                    classes={{
                      root: sass.root
                    }}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                  >
                    Nhận Yêu Cầu
                  </Button>
                </div>
                <div className={sass.noteText}>
                  **Thông tin liên hệ sẽ hiển thị sau khi nhận yêu cầu**
                </div>
              </div>
            </div>
          </div>
          <div className={sass.sideBarContainer}>
            <div className={sass.sidebarInfoContainer}>
              <div>
                <img
                  width="60px"
                  src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/51708368_2039666159448341_4825178221257424896_n.jpg?_nc_cat=105&_nc_oc=AQlGKXsp3jt4pBprHcPoeeBv3l0TJbzTbSpea-oDf0pBpHtjBqPrYSBXjOqOkBFE0FQ&_nc_ht=scontent.fsgn2-1.fna&oh=75a6f011fa5f9f69a811bd6c08712e14&oe=5D7BB8B4"
                />
              </div>
              <div>
                <div>{jobData.name}</div>
                <div className={sass.descriptionItem}>
                  <img src={placeIcon} />
                  <div>{placeDisplay}</div>
                </div>
              </div>
            </div>
            <div className={sass.button}>
              <Button
                classes={{
                  root: sass.root
                }}
                size="large"
                variant="contained"
                color="primary"
                fullWidth={true}
              >
                Nhận Yêu Cầu
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    phone: state.user.phone
  }
}

export default connect(mapStateToProps)(YeuCauChiTiet)
