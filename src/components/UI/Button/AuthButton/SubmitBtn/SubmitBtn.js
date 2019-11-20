import React from 'react'
import * as classes from '../_AuthBtn.module.scss'
import { LogIn } from 'react-feather'
import PropTypes from 'prop-types'

const SubmitBtn = ({ text }) => 
  <button type="submit" className={classes.btnStyle}>
    <LogIn/>
    <h4>{text}</h4>
  </button>

SubmitBtn.propTypes = {
  text: PropTypes.string
}

export default SubmitBtn