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
  top: PropTypes.element,
  topStyle: PropTypes.object,
  bottom: PropTypes.element,
  bottomStyle: PropTypes.object,
  style: PropTypes.object,
  submit: PropTypes.func,
}

export default Form