import React from 'react'
import * as classes from './Button.module.scss'

const Button = ({ text, style }) => 
  <div className={classes.Button} style={style}>
    <p>{text}</p>
  </div>

export default Button