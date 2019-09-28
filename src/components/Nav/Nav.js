import React from 'react'
import * as classes from './Nav.module.scss'
import { NavLink } from 'react-router-dom'
import Button from '../UI/Button'

const Nav = () => 
  <nav className={classes.Nav}>
    <div className={classes.NavTop}>
      <h1>PHOTO APP</h1>
      <div className={classes.NavTopRight}>
        <Button text="Upload"/>
        <div className={classes.ProfilePicture}/>
      </div>
    </div>
    <div className={classes.NavBottom}>
      <NavLink><p>Profile</p></NavLink>
      <NavLink><p>Following</p></NavLink>
      <NavLink><p>Settings</p></NavLink>
    </div>
  </nav>

export default Nav