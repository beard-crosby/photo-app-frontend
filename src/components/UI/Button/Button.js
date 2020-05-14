import React from 'react'
import styles from './_button.module.scss'
import { Upload, Check, LogIn } from 'react-feather'
import PropTypes from 'prop-types'

const Button = ({ text, style, submit, disabled, onClick, uploadSVG, checkSVG, loginSVG, appleIMG, googleIMG, hideMobile, hideBorder }) => 
  <button 
    disabled={disabled}
    type={submit ? "submit" : "button"} 
    className={`${styles.button} ${hideMobile && styles.hideMobile} ${hideBorder && styles.hideBorder}`} 
    style={style} 
    onClick={onClick}>
      {appleIMG && <img alt="Apple" src={require("../../../static/logo/apple.png")}/>}
      {googleIMG && <img alt="Google" src={require("../../../static/logo/google.png")}/>}
      {loginSVG && <LogIn/>}
      <p>{text}</p>
      {uploadSVG && <Upload/>}
      {checkSVG && <Check/>}
  </button>

Button.propTypes = {
  text: PropTypes.string, // Text on the button.
  style: PropTypes.object, // Can change style on Component call.
  onClick: PropTypes.func, // Pass up onClick event.
  submit: PropTypes.bool, // True = Trigure form submit event.
  uploadSVG: PropTypes.bool, // True = display uploadSVG.
  checkSVG: PropTypes.bool, // True = display checkSVG.
  loginSVG: PropTypes.bool, // True = display loginSVG.
  appleIMG: PropTypes.bool, // True = display appleIMG.
  googleIMG: PropTypes.bool, // True = display googleIMG.
  hideMobile: PropTypes.bool, // True = hide for mobile devices.
  hideBorder: PropTypes.bool, // True = hide border.
}

export default Button