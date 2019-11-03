import React from 'react'
import * as classes from './Nav.module.scss'
import { NavLink, Link } from 'react-router-dom'
import UploadBtn from '../UI/Button/UploadBtn'

const Nav = ({ token }) => 
  <nav className={classes.Nav}>
    <div className={classes.NavTop}>
      <Link to="/"><h1>PHOTO APP</h1></Link>
      <div className={classes.NavTopRight}>
        <Link to="/"><UploadBtn/></Link>
        {token ? <Link to="/profile"><div className={classes.ProfilePicture}/></Link> : 
        <Link to="/"><h5 className={classes.Login}>LOGIN</h5></Link>}
      </div>
    </div>
    <div className={classes.NavBottom}>
      <NavLink to="/"><p>Following</p></NavLink>
      <NavLink to="/profile"><p>Profile</p></NavLink>
      <NavLink to="/settings"><p>Settings</p></NavLink>
    </div>
  </nav>

export default Nav