import React from 'react'
import * as classes from './_Button.module.scss'
import PropTypes from 'prop-types'

const Button = ({ text, style, HideMobile, darkMode }) => {
  const classArr = [classes.Button]

  if (HideMobile) {
    classArr.push(classes.HideMobile)
  } else if (darkMode) {
    classArr.push(classes.darkMode)
  }

  return (
    <div className={classArr.join(' ')} style={style}>
      <p>{text}</p>
    </div>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  HideMobile: PropTypes.bool,
  darkMode: PropTypes.bool
}

export default Button