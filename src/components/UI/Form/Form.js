import React from 'react'
import * as classes from './_form.module.scss'

const Form = ({ top, topStyle, children, bottom, bottomStyle, style, submit }) => 
  <form className={classes.form} style={style} onSubmit={submit}>
    {top && <div className={classes.top} style={topStyle}>{top}</div>}
    {children}
    {bottom && <div className={classes.bottom} style={bottomStyle}>{bottom}</div>}
  </form>

export default Form