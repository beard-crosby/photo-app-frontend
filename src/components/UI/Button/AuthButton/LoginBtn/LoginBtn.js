import React from 'react'
import * as classes from '../_AuthBtn.module.scss'
import { LogIn } from 'react-feather'
import PropTypes from 'prop-types'

const Login = ({ text }) => 
  <button type="submit" className={classes.btnStyle}>
    <LogIn/>
    <h4>{text}</h4>
  </button>

Login.propTypes = {
  text: PropTypes.string
}

export default Login