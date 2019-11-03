import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import UploadBtn from '../UI/Button/UploadBtn'

const Nav = ({ token }) => 
  <nav className="nav">
    <div className="nav-top">
      <Link to="/"><h1>PHOTO APP</h1></Link>
      <div className="nav-top-right">
        <Link to="/"><UploadBtn/></Link>
        {token ? <Link to="/profile"><div className="profile-picture"/></Link> : 
        <Link to="/"><h5 className="login">LOGIN</h5></Link>}
      </div>
    </div>
    <div className="nav-bottom">
      <NavLink to="/"><p>Following</p></NavLink>
      <NavLink to="/profile"><p>Profile</p></NavLink>
      <NavLink to="/settings"><p>Settings</p></NavLink>
    </div>
  </nav>

export default Nav