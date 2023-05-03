// reactjs
import React from 'react'
import { connect } from 'react-redux'

// routing
import { Link } from '../routes'

// custom components
import Layout from '../components/Layout'
import JobDetails from '../components/JobDetails'

// @material-ui
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

// images
import imgDoDienTu from '../static/images/post_job/do-dien-tu.jpg'
import imgDoGiaDung from '../static/images/post_job/do-dien-gia-dung.jpg'
import imgNoiThat from '../static/images/post_job/noi-that.jpg'
import imgVanPhong from '../static/images/post_job/van-phong.jpg'
import imgGiaiTri from '../static/images/post_job/giai-tri.jpg'
import imgOther from '../static/images/post_job/other.jpg'
import imgSuaXe from '../static/images/post_job/sua-xe.jpg'
import imgCongNong from '../static/images/post_job/may-cong-nong-nghiep.jpg'
import imgYeuCau from '../static/images/post_job/theo-yeu-cau.jpg'
import imgNhaCua from '../static/images/post_job/nha-cua.jpg'

// styling
import sass from '../styles/sass/pages/post_job.scss'

class PostJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      categories: [
        { value: '0', label: 'Đồ điện tử', img: imgDoDienTu },
        { value: '1', label: 'Đồ điện gia dụng', img: imgDoGiaDung },
        { value: '2', label: 'Sửa xe', img: imgSuaXe },
        {
          value: '3',
          label: 'Giải trí, thể thao, thời trang',
          img: imgGiaiTri
        },
        { value: '4', label: 'Nhà cửa', img: imgNhaCua },
        { value: '8', label: 'Nội thất', img: imgNoiThat },
        { value: '7', label: 'Chế tạo theo yêu cầu', img: imgYeuCau },
        {
          value: '6',
          label: 'Máy công, nông nghiệp, công nghệ',
          img: imgCongNong
        },
        { value: '5', label: 'Đồ văn phòng', img: imgVanPhong },
        { value: '9', label: 'Lĩnh vực khác', img: imgOther }
      ]
    }
  }

  onSelectCategory = value => e => {
    e.preventDefault()
    this.setState({
      selected: value
    })
  }

  render() {
    const { name, _id, isAuthenticated } = this.props
    const { categories, selected } = this.state

    const user = { name, _id }

    let categoriesComponent = []
    categories.forEach((c, i) => {
      categoriesComponent.push(
        <Grid item className={sass.desc} xs={6} sm={4} md={3} key={i}>
          <Paper onClick={this.onSelectCategory(i)} className={sass.descPaper}>
            <img className={sass.descImg} src={c.img} alt={c.label} />
            <Typography className={sass.descTitle} variant="subtitle1">
              {c.label}
            </Typography>
          </Paper>
        </Grid>
      )
    })

    let mainContent
    if (selected != null) {
      mainContent = (
        <JobDetails
          user={user}
          category={categories[selected]}
          reset={this.onSelectCategory(null)}
        />
      )
    } else {
      mainContent = (
        <div className={sass.container}>
          <Typography
            className={sass.label}
            variant="h5"
            align="center"
            color="primary"
          >
            Bạn cần sửa gì?
          </Typography>
          <Grid container className={sass.descContainer} spacing={24}>
            {categoriesComponent}
          </Grid>
        </div>
      )
    }

    return (
      <Layout>
        <Dialog
          open={!isAuthenticated}
          aria-labelledby="alert-dialog-label"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-label">
            {'Vui lòng đăng nhập'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Vui lòng đăng nhập để có thể đăng tin tìm thợ
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

        {mainContent}
      </Layout>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    name: state.user.name,
    _id: state.auth.ID
  }
}

export default connect(mapStateToProps)(PostJob)
