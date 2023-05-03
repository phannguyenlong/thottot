// externals
import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Cascader from 'rc-cascader'
import ReactPaginate from 'react-paginate'
import { Scrollbars } from 'react-custom-scrollbars'
//internals
import Layout from '../components/Layout'
import Worker from '../components/Worker'
import Jobs from '../components/Jobs'
import { Link } from '../routes'
// styling
import sass from '../styles/sass/pages/index.scss'
import Banner from '../static/images/Banner.svg'
// apis
import { viewLimit, placeOptions, specialitiesOptions } from '../api/constants'
import { findJob } from '../api/API'
import { branchesGet, branchesCount } from '../api/branches'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      placeValue: undefined,
      placeInputValue: '',
      specialityValue: undefined,
      specialityInputValue: '',
      jobData: [],
      countBranches: 0,
      branches: []
    }
  }

  componentDidMount() {
    // get jobs
    findJob().then(resp => this.setState({ jobData: resp.payload.jobs }))
    this.reloadBranches()
  }

  reloadBranches = () => {
    const branchesResp = branchesGet({
      include: 'owner',
      limit: viewLimit,
      skip: this.state.offset,
      speciality: this.state.specialityValue,
      place: this.state.placeValue
    })
    const countResp = branchesCount({
      speciality: this.state.specialityValue,
      place: this.state.placeValue
    })
    Promise.all([branchesResp, countResp])
      .then(data => {
        this.setState({
          branches: data[0].payload.branches,
          countBranches: data[1].payload.count
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onChangePlace = (value, selectedOptions) => {
    this.setState(
      {
        placeInputValue: selectedOptions.map(o => o.label).join(', ')
      },
      () => this.setState({ placeValue: value[1] }, () => this.reloadBranches())
    )
  }

  onChangeSpeciality = (value, selectedOptions) => {
    this.setState(
      {
        specialityInputValue: selectedOptions.map(o => o.label).join(', ')
      },
      () =>
        this.setState({ specialityValue: value[1] }, () =>
          this.reloadBranches()
        )
    )
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handlePageClick = data => {
    let selected = data.selected
    let offset = Math.ceil(selected * viewLimit)

    this.setState({ offset: offset }, () => {
      this.reloadBranches()
    })
  }

  jobDisplay = sass => {
    let { jobData } = this.state
    jobData = jobData.reverse()
    return jobData.map(item => (
      <Grid
        key={item.name}
        className={sass.jobContainer}
        container
        spacing={0}
        direction="column"
        justify="space-around"
        alignItems="stretch"
      >
        <Jobs
          title={item.shortDescription}
          speciality={item.speciality}
          place={item.place}
          time={item.updatedAt}
        />
      </Grid>
    ))
  }

  render() {
    const { jobData } = this.state
    let workersDisplay
    let specialities = specialitiesOptions.map(option => ({
      label: option.label,
      value: option.value,
      children: option.options
    }))
    if (this.state.branches.length >= 1) {
      workersDisplay = this.state.branches.map(branch => {
        if (branch) {
          return (
            <Grid xs={12} key={branch._id} item>
              <Worker branchInfo={branch} />
            </Grid>
          )
        }
      })
    }

    return (
      <Layout>
        <div className={sass.container}>
          <div className={sass.upper}>
            <p className={sass.prompt}>
              <img src={Banner} className={sass.logoImg} />
            </p>
            <div className={sass.selectors}>
              <Cascader
                options={specialities}
                transitionName="none"
                onChange={this.onChangeSpeciality}
                expandTrigger="hover"
              >
                <input
                  placeholder="Tìm thợ theo Lĩnh vực/Ngành nghề"
                  type="text"
                  aria-label="search"
                  value={this.state.specialityInputValue}
                  readOnly
                  className={sass.searchMiddle}
                />
              </Cascader>
              <Cascader
                options={placeOptions}
                transitionName="none"
                onChange={this.onChangePlace}
                expandTrigger="hover"
              >
                <input
                  placeholder="Tìm thợ theo Tỉnh/thành, Quận/huyện"
                  type="text"
                  aria-label="search"
                  value={this.state.placeInputValue}
                  readOnly
                  className={sass.searchMiddle}
                />
              </Cascader>
            </div>
            <Button
              classes={{
                root: sass.btnRoot,
                label: sass.btnLabel
              }}
            >
              Tìm kiếm
              <SearchIcon className={sass.rightIcon} />
            </Button>
          </div>
          <div className={sass.lower}>
            <div className={sass.worker}>
              <b className={sass.thotimthay}>Thợ tìm thấy</b>
              <Scrollbars style={{ height: 500 }} autoHide={true}>
                <Grid
                  container
                  className={sass.workersContainer}
                  alignItems="center"
                  justify="space-around"
                  spacing={24}
                >
                  {workersDisplay ? (
                    workersDisplay
                  ) : (
                    <Grid item>
                      <div style={{ textAlign: 'center' }}>
                        Không tìm thấy thợ
                      </div>
                    </Grid>
                  )}
                </Grid>
              </Scrollbars>
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(this.state.countBranches / viewLimit)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={sass.pagination}
                subContainerClassName={`${sass.pages} ${sass.pagination}`}
                activeClassName={sass.activePage}
              />
            </div>
            <div className={sass.job}>
              <div className={sass.thotimthay}>
                <b>
                  Yêu cầu mới{'  '}
                  <Link route="yeu-cau">
                    <a target="_blank">{'Xem chi tiết >>'}</a>
                  </Link>
                </b>
              </div>
              <Scrollbars
                autoHide={true}
                style={{
                  height: 500,
                  backgroundColor: 'rgba(240, 240, 237, 1)',
                  borderRadius: '8px'
                }}
              >
                {this.jobDisplay(sass)}
              </Scrollbars>
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(jobData.length / 20)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={sass.pagination}
                subContainerClassName={`${sass.pages} ${sass.pagination}`}
                activeClassName={sass.activePage}
              />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Index
