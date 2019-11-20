import React from 'react'
import * as classes from './LoginBtn.module.scss'
import PropTypes from 'prop-types'

const Login = ({ text }) => 
  <button type="submit" className={classes.btnStyle}>
    <span className={classes.textStyle}>{text}</span>
  </button>

Login.propTypes = {
  text: PropTypes.string
}

export default Login