import React from 'react'
import * as classes from './LoginBtn.module.scss'
import PropTypes from 'prop-types'

const Login = props => 
  <button type="submit" className={`${classes.btnStyle} ${props.marginRight && classes.marginRight}`}>
    <span className={classes.textStyle}>{props.text}</span>
  </button>

Login.propTypes = {
  marginRight: PropTypes.bool,
  text: PropTypes.string
}

export default Login