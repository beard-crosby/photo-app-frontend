import React from 'react'
import * as classes from './UploadBtn.module.scss'
import { Upload } from 'react-feather'

const UploadBtn = () => 
  <div className={classes.UploadBtn}>
    <h5>UPLOAD</h5>
    <Upload/>
  </div>

export default UploadBtn