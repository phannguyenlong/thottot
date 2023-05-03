import React from 'react'
import Layout from '../components/Layout'
import StarRatings from 'react-star-ratings'
// materail UI
import Button from '@material-ui/core/Button'
//style
import sass from '../styles/sass/pages/thong-bao.scss'

class ThongBao extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      rating: 4.5,
      ratingNumber: 0
    }
    this.changeRating = this.changeRating.bind(this)
  }
  changeRating(newRating) {
    const { isAuth, viewBranch } = this.props
    this.setState({
      rating: newRating,
      ratingNumber: this.state.ratingNumber + 1
    })
  }
  render() {
    return (
      <Layout>
        <div className={sass.container}>
          <div className={sass.infoContainer}>
            <div>
              <img
                className={sass.image}
                src="http://ewic.org/wp-content/themes/ewic/images/Construction%20Worker.png"
              />
            </div>
            <div className={sass.infomation}>
              <div className={sass.name}>
                <div>Tiệm: Sửa Laptop 24h</div>
                <div>
                  Chi phí dự kiến:
                  <span className={sass.price}>800.000đ</span>
                </div>
              </div>
              <div className={sass.contactContainer}>
                <div>Vị trí: Q. Bình Thạnh, Tp.</div>
                <div>Ngày: 28/5/2019</div>
                <div>Kỹ thuật viên tiếp nhận: Robert The Worker</div>
                <div>SĐT: 0943124123</div>
              </div>
              <div className={sass.rating}>
                <div>Đánh giá:</div>
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
            </div>
          </div>
          <div className={sass.message}>
            " Hi Mr.Long, I can fix your laptop. Have no worries, consider it
            done! "
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
              Xác nhận
            </Button>
          </div>
          <div className={sass.button}>
            <Button
              classes={{
                root: sass.root1
              }}
              size="large"
              variant="contained"
              color="primary"
              fullWidth={true}
            >
              Xem hồ sơ
            </Button>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ThongBao
