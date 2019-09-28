import React from 'react'
import * as classes from './Footer.module.scss'
import Button from '../UI/Button'

const Footer = () => 
  <div className={classes.Footer}>
    <p>Beard-Crosby &copy;</p>
    <Button text="Logout"/>
  </div>

export default Footer