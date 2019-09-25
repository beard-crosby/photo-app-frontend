import React from 'react'
import * as classes from './UploadBtn.module.scss'
import { MdCloudUpload } from 'react-icons/md'

const UploadBtn = () => 
  <div className={classes.UploadBtn}>
    <h3>Upload</h3>
    <MdCloudUpload/>
  </div>

export default UploadBtn