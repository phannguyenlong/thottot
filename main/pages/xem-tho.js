import React, { Component } from 'react'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
import Carousel from 'react-slick'
import { connect } from 'react-redux'
import Layout from '../components/Layout'
import { Link } from '../routes'
//picture
import pointer from '../static/images/pointer.svg'
import line from '../static/images/comment-line.svg'
import lineMobile from '../static/images/comment-line-mobile.svg'
import StarRatings from 'react-star-ratings'
import MediaQuery from 'react-responsive'
// material UI
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import { branchGetBySlug } from '../api/branches'
import { specialitiesOptions /*, placeOptions*/ } from '../api/constants'

// import '../styles/sass/XemThoCarousel.scss'
import sass from '../styles/sass/pages/xem-tho.scss'

class ViewTho extends Component {
  constructor(props) {
    const { viewBranch } = props
    super(props)

    this.state = {
      openDialog: false,
      phoneNumber: `Nhấn để hiện số:
        ${viewBranch.branchPhone.slice(0, 6)}
        ***`,
      ratingNumber:
        viewBranch.numOfRating !== undefined ? viewBranch.numOfRating : 0,
      rating: viewBranch.rating !== undefined ? viewBranch.rating : 0,
      branchTag: [],
      branchImage: [
        {
          url: 'http://clipart-library.com/images/kcKo648gi.jpg',
          caption: 'Welcome to thotot..biz'
        }
      ]
    }
    this.changeRating = this.changeRating.bind(this)
    this.showPhoneNumber = this.showPhoneNumber.bind(this)
  }
  static async getInitialProps(props) {
    let { query } = props.ctx
    let data = await branchGetBySlug({
      slug: query.slug,
      include: 'owner'
    })
    let { branch } = data.payload
    return {
      viewBranch: branch
    }
  }
  componentDidMount() {
    FB.XFBML.parse() // this is use for facebook
  }
  changeRating(newRating) {
    const { isAuth, viewBranch } = this.props
    this.setState({
      openDialog: isAuth ? false : true,
      rating: newRating,
      ratingNumber: viewBranch.numOfRating + 1
    })
  }
  showPhoneNumber() {
    const { viewBranch } = this.props
    this.setState({
      phoneNumber: `Số điện thoại của thợ: ${viewBranch.branchPhone}`
    })
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
    const { viewBranch } = this.props
    let specialitiesFields = []
    // if (typeof document !== 'undefined') {
    //   console.log('RUN MOTHER FUCKER')
    //   document.cookie = 'prevUrl' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
    // }
    if (
      typeof viewBranch !== 'undefined' &&
      typeof viewBranch.owner !== 'undefined'
    ) {
      viewBranch.owner.specialities.forEach(spec => {
        let categoryIndex = parseInt(spec.slice(0, -2))
        let specIndex = parseInt(spec.slice(-2))
        specialitiesFields.push(
          specialitiesOptions[categoryIndex].options[specIndex].label
        )
      })
    }
    return (
      <Layout>
        <div className={sass.container}>
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
                {viewBranch.images !== undefined
                  ? this.createImage(viewBranch.images)
                  : this.createImage(this.state.branchImage)}
              </Carousel>
            </div>
          </div>
          <div className={sass.information}>
            <h2 className={sass.branchName}>
              <b>{viewBranch.branchName}</b>
            </h2>
            <div className={sass.info}>
              <Button
                classes={{
                  root: sass.button
                }}
                size="large"
                variant="contained"
                color="primary"
                fullWidth={false}
                onClick={() => this.showPhoneNumber()}
              >
                {this.state.phoneNumber}
              </Button>
              <p style={{ textAlign: 'left' }}>
                <img src={pointer} />
                <b>Địa chỉ: </b>
                {viewBranch.address}
              </p>
              <a href="#">Xem bản đồ</a>
            </div>
            <div className={sass.tagContainer}>
              {this.createTag(specialitiesFields)}
            </div>
            <div className={sass.description}>{viewBranch.description}</div>
          </div>
          <div className={sass.rating}>
            <div className={sass.ratingLabel}>
              Đánh giá: {this.state.rating}
            </div>
            <div>
              <Dialog
                open={this.state.openDialog}
                aria-labelledby="alert-dialog-label"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-label">
                  {'Vui lòng đăng nhập'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Vui lòng đăng nhập để có thể thực hiện tác vụ này
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Link route="dang-nhap">
                    <Button color="primary" autoFocus>
                      Tiếp tục
                    </Button>
                  </Link>
                </DialogActions>
              </Dialog>
              <StarRatings
                className={sass.ratingLabel}
                rating={this.state.rating}
                starRatedColor="rgba(255, 218, 68, 1)"
                changeRating={this.changeRating}
                numberOfStars={5}
                starDimension="20px"
                name="rating"
                starSpacing="3px"
              />
            </div>
            <div>({this.state.ratingNumber})</div>
          </div>
          <div className={sass.line}>
            <MediaQuery query="(min-device-width: 600px)">
              <img className={sass.lineImage} src={line} />
            </MediaQuery>
            <MediaQuery query="(max-device-width: 601px)">
              <img className={sass.lineImage} src={lineMobile} />
            </MediaQuery>
          </div>
          <div className={sass.comment}>
            <div
              className="fb-comments"
              data-href={`https://thotot.biz/xem-tho/${viewBranch.slug}`}
              data-width="100%"
              data-numposts="5"
            />
          </div>
        </div>
        <style>{`
          .carousel .thumb img {
            width: 100% !important;
            height: 100% !important;
        }
          .carousel .slide img {
              max-height: 400px;  /* change this to whatever you want */
              width: 100%;
              height: 400px;
              object-fit: contain;
          }
          @media only screen and (max-width: 400px) {
            .carousel .slide img {
              max-height: none;
              height: 200px;
          }
        }
        `}</style>
      </Layout>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    isAuth: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(ViewTho)
