import React from 'react'
import * as classes from './_UploadBtn.module.scss'
import { Upload } from 'react-feather'
import PropTypes from 'prop-types'

const UploadBtn = ({ style, onClick, text }) => 
  <div className={classes.UploadBtn} onClick={onClick} style={style}>
    <h5>{text}</h5>
    <Upload/>
  </div>

UploadBtn.propTypes = {
  onClick: PropTypes.func, // Passing up the onClick event.
  style: PropTypes.object, // Can change style on Component call.
  text: PropTypes.string, // Text on the button.
}

export default UploadBtn