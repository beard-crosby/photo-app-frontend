import React from 'react'
import styles from './_button.module.scss'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'


const Button = ({ text, style, submit, disabled, onClick, icon, iconRight, redirect, border, boxShadow, id, history }) => 
  <button 
    disabled={disabled}
    type={submit ? "submit" : "button"} 
    className={`${styles.button} ${iconRight && styles.iconRight} ${border && styles.border} ${boxShadow && styles.boxShadow}`}
    id={id}
    style={style} 
    onClick={redirect ? () => history.push(redirect) : onClick}>
      {icon && !iconRight && icon}
      <h5>{text}</h5>
      {icon && iconRight && icon}
  </button>

Button.propTypes = {
  text: PropTypes.string,     // Text on the button.
  style: PropTypes.object,    // Can change style on Component call. Btn needs width.
  onClick: PropTypes.func,    // Pass up onClick event.
  redirect: PropTypes.string, // Redirect to path in passed string.
  submit: PropTypes.bool,     // True = Trigure form submit event.
  icon: PropTypes.element,    // True = display passed icon element.
  iconRight: PropTypes.bool,  // True = place the icon on the right side of the text.
  border: PropTypes.bool,     // True = display border and background.
  boxShadow: PropTypes.bool,  // True = display box-shadow.
  id: PropTypes.string,       // Pass up id.
}

export default withRouter(Button)