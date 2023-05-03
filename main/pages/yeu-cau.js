import React from 'react'
// custom component
import Layout from '../components/Layout'
// apis
import { findJob } from '../api/API'
import { placeOptions, specialitiesOptions } from '../api/constants'
// routing
import { Link } from '../routes'
//module
import Cascader from 'rc-cascader'
import MediaQuery from 'react-responsive'
//material UI
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Zoom from '@material-ui/core/Zoom'
import Collapse from '@material-ui/core/Collapse'
//picture
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
// style
import sass from '../styles/sass/pages/yeu-cau.scss'

class YeuCau extends React.Component {
  constructor() {
    super()
    this.state = {
      jobData: [],
      filterJobData: [],
      inputValueSpeciality: '',
      speciality: '',
      inputValueProvince: '',
      specialityNumber: [],
      provinceNumber: ['1'], // use for getting data for district
      inputValueDistrcit: '',
      districtNumber: [],
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
  componentDidMount() {
    findJob().then(resp => {
      this.setState({
        jobData: resp.payload.jobs,
        filterJobData: resp.payload.jobs
      })
    })
  }
  onChangeSpeciality = (value, selectedOptions) => {
    const { jobData } = this.state
    let filterData = jobData
      .filter(item => {
        return item.category === Number(value[0])
      })
      .filter(item => {
        return item.speciality === value[1]
      })
    this.setState({
      specialityNumber: value,
      inputValueSpeciality: selectedOptions.map(o => o.label).join(', '),
      filterJobData: filterData,
      inputValueProvince: 'Tỉnh/Thành',
      inputValueDistrcit: 'Quận/Huyện'
    })
  }
  onChangeProvince = (value, selectedOptions) => {
    filterData = this.handleFilter() // recied data filted
    let filterData = filterData.filter(item => {
      let place = 0
      if (item.place.length === 3) {
        place = Number(item.place.slice(0, 1)) // get 1 first letter
      } else if (item.place.length === 4) {
        place = Number(item.place.slice(0, 2)) // get 2 first letter
      }
      return place === Number(value[0])
    })
    this.setState({
      inputValueProvince: selectedOptions.map(o => o.label).join(', '),
      provinceNumber: value,
      filterJobData: filterData,
      inputValueDistrcit: 'Quận/Huyện'
    })
  }
  onChangeDistrict = (value, selectedOptions) => {
    filterData = this.handleFilter() // recied data filted
    let filterData = filterData.filter(item => {
      return item.place === value[0]
    })
    this.setState({
      inputValueDistrcit: selectedOptions.map(o => o.label).join(', '),
      districtNumber: value,
      filterJobData: filterData
    })
  }
  handleFilter = () => {
    const { specialityNumber, jobData } = this.state
    // for speciality
    let filterData = jobData
      .filter(item => {
        return item.category === Number(specialityNumber[0])
      })
      .filter(item => {
        return item.speciality === specialityNumber[1]
      })
    return filterData // return data filted
  }
  jobDisplay = (item, categories) => {
    let specialityDisplay = specialitiesOptions[item.category].options
      .filter(special => {
        return special.value === item.speciality
      })[0]
      .label.split('(', 1)
    let placeDisplay = `${
      placeOptions[
        item.place.length === 3
          ? Number(item.place.slice(0, 1))
          : Number(item.place.slice(0, 2))
      ].children.filter(place => {
        return place.value === item.place
      })[0].label
    },${
      placeOptions[
        item.place.length === 3
          ? Number(item.place.slice(0, 1))
          : Number(item.place.slice(0, 2))
      ].label
    }`
    return (
      <Grid key={item._id} item xs={12} sm={3}>
        <Zoom
          in={true}
          style={{
            transitionDelay: '100ms'
          }}
        >
          <Paper>
            <div className={sass.paper}>
              <MediaQuery query="(min-device-width: 600px)">
                <Link route={`/yeu-cau/${item.slug}`}>
                  <Grid container direction="column" spacing={8}>
                    <Grid item container direction="row">
                      <Grid item xs={6}>
                        <img width="70px" src={categories[item.category].img} />
                      </Grid>
                      <Grid item xs={6}>
                        <p>
                          <b>{specialityDisplay}</b>
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <p className={sass.smallText}>{placeDisplay}</p>
                      <p className={sass.description}>
                        {item.shortDescription}
                      </p>
                    </Grid>
                  </Grid>
                </Link>
              </MediaQuery>
              <MediaQuery query="(max-device-width: 599px)">
                <Grid
                  container
                  direction="row"
                  spacing={16}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={3}>
                    <img width="60px" src={categories[item.category].img} />
                  </Grid>
                  <Grid item xs={5}>
                    <div>
                      <p>
                        <b>{specialityDisplay}</b>
                      </p>
                      <p className={sass.smallText}>{placeDisplay}</p>
                    </div>
                  </Grid>
                  <Link route={`/yeu-cau/${item.slug}`}>
                    <Grid item xs={3}>
                      <div className={sass.smallText}>
                        Ấn vào đây để biết thêm chi tiết
                      </div>
                    </Grid>
                  </Link>
                </Grid>
                <p className={sass.description}>{item.shortDescription}</p>
              </MediaQuery>
            </div>
          </Paper>
        </Zoom>
      </Grid>
    )
  }
  render() {
    const {
      filterJobData,
      categories,
      inputValueSpeciality,
      inputValueProvince,
      inputValueDistrcit
    } = this.state
    let province = placeOptions.map(place => ({
      label: place.label,
      value: place.value
    }))
    let placeOptionForDistrict = placeOptions.filter(place => {
      return place.value === this.state.provinceNumber[0]
    })
    let district = placeOptionForDistrict[0].children.map(province => ({
      label: province.label,
      value: province.value
    }))
    let specialities = specialitiesOptions.map(option => ({
      label: option.label,
      value: option.value,
      children: option.options
    }))
    let cascaderData = [
      {
        options: specialities,
        onChange: this.onChangeSpeciality,
        label: 'Công việc',
        value: inputValueSpeciality
      },
      {
        options: province,
        onChange: this.onChangeProvince,
        label: 'Tỉnh/thành',
        value: inputValueProvince
      },
      {
        options: district,
        onChange: this.onChangeDistrict,
        label: 'Quận/Huyện',
        value: inputValueDistrcit
      }
    ]
    return (
      <Layout>
        <div className={sass.container}>
          <div className={sass.pageHeader}>
            <h1 className={sass.headerText}>
              Tìm kiếm công việc xung quanh bạn
            </h1>
            <div className={sass.searchContainer}>
              <div className={sass.labelContainer}>
                <p>Công việc:</p>
                <p>Tỉnh/thành:</p>
                <p>Quận/huyện:</p>
              </div>
              <div className={sass.selectors}>
                {cascaderData.map(item => (
                  <Cascader
                    key={item.label}
                    options={item.options}
                    transitionName="none"
                    expandTrigger="hover"
                    onChange={item.onChange}
                  >
                    <input
                      placeholder={item.label}
                      readOnly
                      type="text"
                      aria-label="search"
                      value={item.value}
                      className={sass.searchMiddle}
                    />
                  </Cascader>
                ))}
              </div>
            </div>
          </div>
          <div className={sass.jobDisplayContainer}>
            <hr />
            <br />
            <Collapse
              in={this.state.filterJobData.length === 0 ? false : true}
              collapsedHeight="40px"
            >
              <Grid container direction="row" alignItems="center" spacing={32}>
                {filterJobData.map(item => this.jobDisplay(item, categories))}
              </Grid>
            </Collapse>
          </div>
        </div>
      </Layout>
    )
  }
}
export default YeuCau
