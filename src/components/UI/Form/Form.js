import React from 'react'
import * as classes from './_form.module.scss'

const Form = ({ topLeft, topMiddle, topRight, children, bottomLeft, bottomMiddle, bottomRight, style }) => 
  <div className={classes.form} style={style}>
    <div className={classes.top}>
      {topLeft}
      {topMiddle}
      {topRight}
    </div>
    {children}
    <div className={classes.bottom}>
      {bottomLeft}
      {bottomMiddle}
      {bottomRight}
    </div>
  </div>

export default Form