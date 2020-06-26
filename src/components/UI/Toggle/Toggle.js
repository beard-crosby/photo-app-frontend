import React, { useState } from 'react'
import styles from './_Toggle.module.scss'
import Slider from './Slider/Slider'
import PropTypes from 'prop-types'

const Toggle = ({ text, Default }) => {
  const [ slide, setSlide ] = useState(Default)

  return (
    <div className={styles.toggle} onClick={() => setSlide(!slide)}>
      <h5>{text}</h5>
      <Slider slide={slide}/>
    </div>
  )
}

Toggle.propTypes = {
  text: PropTypes.string.isRequired, // Text for toggle.
  Default: PropTypes.bool,           // Default slider position.
}

export default Toggle