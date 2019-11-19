import React from 'react'
import * as classes from './_Button.module.scss'

const Button = ({ text, style, HideMobile, darkMode }) => {
  const classArr = [classes.Button]

  if (HideMobile) {
    classArr.push(classes.HideMobile)
  } else if (darkMode) {
    classArr.push(classes.darkMode)
  }

  return (
    <div className={classArr.join(' ')} style={style}>
      <p>{text}</p>
    </div>
  )
}

export default Button