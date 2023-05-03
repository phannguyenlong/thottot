import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { specialitiesOptions, placeOptions } from '../api/constants'

import sass from '../styles/sass/Jobs.scss'

class Jobs extends React.Component {
  render() {
    const { title, speciality, place, time } = this.props
    // for city
    let city
    if (place.length === 3) {
      city = placeOptions[place[0]].label
    } else if (place.length === 4) {
      city = placeOptions[place.slice(0, 2)].label
    }

    // for specialities
    let categoryIndex = parseInt(speciality.slice(0, -2))
    let specIndex = parseInt(speciality.slice(-2))
    const special = specialitiesOptions[categoryIndex].options[specIndex].label
    // for time
    let timeDisplay = ''
    let date = new Date(time)
    let dateNow = new Date()
    let delta = Math.abs(date - dateNow) / 1000
    let days = Math.floor(delta / 86400)
    let hours = Math.floor(delta / 3600) % 24
    let minutes = Math.floor(delta / 60) % 60
    if (days !== 0) timeDisplay = `${days} ngày trước`
    else if (hours !== 0) timeDisplay = `${hours} giờ trước`
    else if (minutes !== 0) timeDisplay = `${minutes} phút trước`
    else timeDisplay = '1 phút trước'
    return (
      <Grid item container direction="column" alignItems="center">
        <Paper className={sass.paper}>
          <Grid item xs container direction="column" spacing={8}>
            <Grid item xs className={sass.titleContainer}>
              <center>{title}</center>
            </Grid>
            <Grid
              item
              xs
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <div className={sass.tag}>{special}</div>
              </Grid>
              <Grid item>
                <div className={sass.place}>
                  {timeDisplay} | {city}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  }
}

export default Jobs
