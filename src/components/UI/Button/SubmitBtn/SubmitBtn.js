import React from 'react'
import '../_button.scss'
import { LogIn, Check } from 'react-feather'
import PropTypes from 'prop-types'

const SubmitBtn = ({ text, check, login, apple, google, style, onClick }) => 
  <button type="submit" className="button" style={style} onClick={onClick}>
    {check && <Check/>}
    {login && <LogIn/>}
    {apple && <img alt="apple logo" src={require("../../../../static/logo/apple.png")}/>}
    {google && <img alt="google logo" src={require("../../../../static/logo/google.png")}/>}
    <h4>{text}</h4>
  </button>

SubmitBtn.propTypes = {
  style: PropTypes.object, // Can change style on Component call.
  onClick: PropTypes.func, // Pass up onClick event.
  text: PropTypes.string, // Text on the button.
  check: PropTypes.bool, // True = display SVG.
  login: PropTypes.bool, // True = display SVG.
  apple: PropTypes.bool, // True = display IMG.
  google: PropTypes.bool, // True = display IMG.
}

export default SubmitBtn