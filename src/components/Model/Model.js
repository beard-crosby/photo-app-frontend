import React from 'react'
import * as classes from './Model.module.scss'

const Model = ({ children, style }) => 
  <div className={classes.Model} style={style}>
    {children}
  </div>

export default Model