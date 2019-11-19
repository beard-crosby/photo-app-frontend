import React, { useContext } from 'react'
import { UserContext } from '../../App'
import { NavLink, Link } from 'react-router-dom'
import UploadBtn from '../UI/Button/UploadBtn'
import { Moon, Sun } from 'react-feather'
import Slider from '../UI/Slider'

const Nav = () => {
  const { darkMode, setDarkMode } = useContext(UserContext)

  return (
    <nav className="nav">
      <div className="nav-top">
        <Link to="/"><h1>PHOTO APP</h1></Link>
        <div className="nav-top-right">
        <Slider SvgFalse={<Moon/>} SvgTrue={<Sun/>} hideMobile style={{ marginRight: 25 }} onClick={() => setDarkMode(!darkMode)}/>
          <Link to="/"><UploadBtn/></Link>
          {/* {token ? <Link to="/profile"><div className="profile-picture"/></Link> :  */}
          <Link to="/auth"><h5 className="login">LOGIN</h5></Link>
        </div>
      </div>
      <div className="nav-bottom">
        <div className="nav-bottom-left">
          <NavLink to="/"><p>Following</p></NavLink>
          <NavLink to="/profile"><p>Profile</p></NavLink>
          <NavLink to="/settings"><p>Settings</p></NavLink>
        </div>
        <Slider SvgFalse={<Moon/>} SvgTrue={<Sun/>} hideDesktop />
      </div>
    </nav>
  )
}

export default Nav