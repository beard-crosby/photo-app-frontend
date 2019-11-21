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
  onClick: PropTypes.func,
  style: PropTypes.object,
  text: PropTypes.string
}

export default UploadBtn