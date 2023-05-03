import React, { Component } from 'react'
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'
import StarHalf from '@material-ui/icons/StarHalf'

import sass from '../styles/sass/Ratings.scss'

class Ratings extends Component {
  render() {
    const { rating, numOfRating } = this.props
    let stars = []
    for (let i = 0; i < 5; i++) {
      let star = <StarBorder key={i} className={sass.star} />
      if (rating > i) {
        star = <Star key={i} className={sass.star} />
        if (rating < i + 1) {
          star = <StarHalf key={i} className={sass.star} />
        }
      }
      stars.push(star)
    }

    return (
      <React.Fragment>
        <span>{stars}</span>
        <span>({numOfRating})</span>
      </React.Fragment>
    )
  }
}

export default Ratings
