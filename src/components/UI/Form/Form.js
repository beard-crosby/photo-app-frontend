import React from 'react'
import * as classes from './_form.module.scss'
import PropTypes from 'prop-types'

const Form = ({ className, hideBottom, top, topStyle, children, bottom, bottomStyle, style, submit }) => 
  <form className={`${classes.form} ${className}`} style={style} onSubmit={submit}>
    {top && <div className={classes.top} style={topStyle}>{top}</div>}
    {children}
    {hideBottom ? null : bottom && <div className={classes.bottom} style={bottomStyle}>{bottom}</div>}
  </form>

Form.propTypes = {
  top: PropTypes.element, // JSX to include at the top of the form.
  topStyle: PropTypes.object, // Style the top of the form. Common use case: justifyContent: 'flex-start'.
  bottom: PropTypes.element, // JSX to include at the bottom of the form.
  bottomStyle: PropTypes.object, // Style the top of the form. Common use case: justifyContent: 'flex-start'.
  className: PropTypes.string, // Programatically add or remove classes to the form.
  style: PropTypes.object, // Can change style on Component call.
  submit: PropTypes.func, // Passing up the Submit event.
  hideBottom: PropTypes.bool, // True = hide the bottom bar if no content. 
}

export default Form