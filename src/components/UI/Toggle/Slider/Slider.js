import React from 'react'
import styles from './_Slider.module.scss'
import PropTypes from 'prop-types'

const Slider = ({ style, slide }) => 
  <div className={`${styles.slider} ${slide && styles.slide}`} style={style}>
    <div className={styles.switch}/>
  </div>

Slider.propTypes = {
  style: PropTypes.object, // Style of slider.
  slide: PropTypes.bool, // Slider position.
}

export default Slider