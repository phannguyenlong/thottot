import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { specialitiesOptions, placeOptions } from '../api/constants'
import { Link } from '../routes'

import noimg from '../static/images/noimg-square.svg'

import Ratings from './Ratings'

import sass from '../styles/sass/Worker.scss'

class Worker extends React.Component {
  render() {
    const { branchInfo } = this.props

    const cityIndex = parseInt(branchInfo.place.slice(0, -2))
    const districtIndex = parseInt(branchInfo.place.slice(-2))
    const city = placeOptions[cityIndex].label
    const district = placeOptions[cityIndex].children[districtIndex].label

    let specialitiesFields = []
    branchInfo.owner.specialities.forEach(spec => {
      let categoryIndex = parseInt(spec.slice(0, -2))
      let specIndex = parseInt(spec.slice(-2))
      specialitiesFields.push(
        specialitiesOptions[categoryIndex].options[specIndex].label
      )
    })

    const makeField = (title, content) => {
      return (
        <Grid item xs className={sass.field}>
          <b>{title}: </b>
          <span>{content}</span>
        </Grid>
      )
    }

    const makeTag = content => {
      return (
        <Grid item className={sass.field}>
          <span className={sass.tag}>{content}</span>
        </Grid>
      )
    }

    let typeField
    let nameField
    let emailField
    if (branchInfo.owner.type === 'individual') {
      typeField = <span style={{ display: 'none' }} />
      nameField = makeField('Tên thợ', branchInfo.owner.fullname)
      emailField = makeField('Email', branchInfo.owner.email)
    } else if (branchInfo.owner.type === 'brand') {
      typeField = (
        <span className={`${sass.brandTag} ${sass.field}`}>
          <b>Tiệm / hãng</b>
        </span>
      )
      nameField = makeField('Tên tiệm', branchInfo.branchName)
      emailField = makeField('Email', branchInfo.branchEmail)
    }

    return (
      <Link route={`/xem-tho/${branchInfo.slug}`}>
        <Paper className={sass.root} elevation={1}>
          {typeField}
          <Grid
            container
            alignItems="center"
            spacing={24}
            className={sass.infoContainer}
          >
            <Grid item xs={4} sm={3} md={2} className={sass.avatarContainer}>
              <img
                className={sass.avatar}
                src={branchInfo.owner.avatar ? branchInfo.owner.avatar : noimg}
              />
            </Grid>
            <Grid
              item
              container
              xs={8}
              sm={5}
              md={4}
              spacing={8}
              direction="column"
              className={`${sass.infoContainer} ${sass.infoContainerUpper}`}
            >
              {nameField}
              {makeField(
                'Đánh giá',
                <Ratings
                  rating={branchInfo.rating}
                  numOfRating={branchInfo.numOfRating}
                />
              )}
              {makeField('Chuyên môn', specialitiesFields.join('. '))}
              <Grid container item spacing={8}>
                {makeTag(city)}
                {makeTag(district)}
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={4}
              md={6}
              spacing={8}
              direction="column"
              className={`${sass.infoContainer} ${sass.infoContainerLower}`}
            >
              {makeField('Giờ làm việc', null)}
              <Grid item container spacing={8}>
                {makeTag(branchInfo.open)}
                {makeTag(branchInfo.close)}
              </Grid>
              {makeField('Điện thoại', branchInfo.branchPhone)}
              {emailField}
            </Grid>
          </Grid>
        </Paper>
      </Link>
    )
  }
}

export default Worker
