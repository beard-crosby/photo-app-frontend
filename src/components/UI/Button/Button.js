import React from 'react'
import './_button.scss'
import PropTypes from 'prop-types'

const Button = ({ text, style, HideMobile, onClick }) => 
  <button className={`button ${HideMobile && `hide-mobile`}`} style={style} onClick={onClick}>
    <p>{text}</p>
  </button>

Button.propTypes = {
  text: PropTypes.string, // Text on the button.
  style: PropTypes.object, // Can change style on Component call.
  HideMobile: PropTypes.bool, // True = hide for mobile devices.
}

export default Button