import React from 'react'
import './_button.scss'
import { Upload, Check, LogIn } from 'react-feather'
import PropTypes from 'prop-types'

const Button = ({ text, style, submit, disabled, onClick, uploadSVG, checkSVG, loginSVG, appleIMG, googleIMG, hideMobile, hideBorder, navBtn }) => 
  <button 
    disabled={disabled}
    type={submit && "submit"} 
    className={`button ${hideMobile && `hide-mobile`} ${hideBorder && `hide-border`} ${navBtn && `nav-btn`}`} 
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
  submit: PropTypes.bool, // True = Make the btn trigure form submit event.
  uploadSVG: PropTypes.bool, // True = display uploadSVG.
  checkSVG: PropTypes.bool, // True = display checkSVG.
  loginSVG: PropTypes.bool, // True = display loginSVG.
  appleIMG: PropTypes.bool, // True = display appleIMG.
  googleIMG: PropTypes.bool, // True = display googleIMG.
  hideMobile: PropTypes.bool, // True = hide for mobile devices.
  hideBorder: PropTypes.bool, // True = hide border.
  navBtn: PropTypes.bool, // True = resize btn and contained IMG/SVG for nav.
}

export default Button