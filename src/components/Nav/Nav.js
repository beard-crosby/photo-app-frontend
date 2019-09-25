import React from 'react'
import * as classes from './Nav.module.scss'
import UploadBtn from '../UI/Button/UploadBtn'

const Nav = () => 
  <div className={classes.Nav}>
    <h3>Photo App</h3>
    <UploadBtn/>
  </div>

export default Nav