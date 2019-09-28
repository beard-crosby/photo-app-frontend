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
      <NavLink to="/"><p>Wall</p></NavLink>
      <NavLink to="/profile"><p>Profile</p></NavLink>
      <NavLink to="/following"><p>Following</p></NavLink>
      <NavLink to="/settings"><p>Settings</p></NavLink>
    </div>
  </nav>

export default Nav