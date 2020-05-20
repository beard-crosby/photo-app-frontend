import React from 'react'
import styles from './_button.module.scss'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'


const Button = ({ text, style, submit, disabled, onClick, icon, redirect, history }) => 
  <button 
    disabled={disabled}
    type={submit ? "submit" : "button"} 
    className={styles.button} 
    style={style} 
    onClick={redirect ? () => history.push(redirect) : onClick}>
      {icon && icon}
      <h5>{text}</h5>
  </button>

Button.propTypes = {
  text: PropTypes.string,     // Text on the button.
  style: PropTypes.object,    // Can change style on Component call. Btn needs width.
  onClick: PropTypes.func,    // Pass up onClick event.
  redirect: PropTypes.string, // Redirect to path in passed string.
  submit: PropTypes.bool,     // True = Trigure form submit event.
  icon: PropTypes.element,    // True = display passed icon element.
}

export default withRouter(Button)