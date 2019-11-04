import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import UploadBtn from '../UI/Button/UploadBtn'
import { Moon, Sun } from 'react-feather'
import Slider from '../UI/Slider'

const Nav = ({ token }) => 
  <nav className="nav">
    <div className="nav-top">
      <Link to="/"><h1>PHOTO APP</h1></Link>
      <div className="nav-top-right">
      {window.matchMedia("(min-width: 451px)").matches && <Slider SvgFalse={<Moon/>} SvgTrue={<Sun/>} style={{ marginRight: 20 }} />}
        <Link to="/"><UploadBtn/></Link>
        {token ? <Link to="/profile"><div className="profile-picture"/></Link> : 
        <Link to="/"><h5 className="login">LOGIN</h5></Link>}
      </div>
    </div>
    <div className="nav-bottom">
      <div className="nav-bottom-left">
        <NavLink to="/"><p>Following</p></NavLink>
        <NavLink to="/profile"><p>Profile</p></NavLink>
        <NavLink to="/settings"><p>Settings</p></NavLink>
      </div>
      {window.matchMedia("(max-width: 450px)").matches && <Slider SvgFalse={<Moon/>} SvgTrue={<Sun/>}/>}
    </div>
  </nav>

export default Nav