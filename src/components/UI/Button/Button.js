import React from 'react'
import * as classes from './_Button.module.scss'
import PropTypes from 'prop-types'

const Button = ({ text, style, HideMobile, darkMode, onClick }) => {
  const classArr = [classes.Button]

  if (HideMobile) {
    classArr.push(classes.HideMobile)
  } else if (darkMode) {
    classArr.push(classes.darkMode)
  }

  return (
    <div className={classArr.join(' ')} style={style} onClick={onClick}>
      <p>{text}</p>
    </div>
  )
}

Button.propTypes = {
  text: PropTypes.string, // Text on the button.
  style: PropTypes.object, // Can change style on Component call.
  HideMobile: PropTypes.bool, // True = hide for mobile devices.
  darkMode: PropTypes.bool // True = Change styling for mobile devices. 
}

export default Button