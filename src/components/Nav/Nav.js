import React, { useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Moon, Sun, Upload } from 'react-feather'
import { withRouter } from 'react-router-dom'
import { switchDarkMode } from '../../shared/utility'
import ProfilePicture from '../UI/ProfilePicture'

const Nav = ({ user, setUser, history }) => {
  useEffect(() => { // Redirect if user.redirect === truthy.
    if (user.redirect) {
      history.push(user.redirect)
      setUser({ ...user, redirect: false })
    }
  }, [user.redirect]) // eslint-disable-line react-hooks/exhaustive-deps

  // On load, check user.settings.dark_mode.
  switchDarkMode(user, setUser, true)

  return (
    <nav>
      <div className="nav-top">
        <Link to="/"><h1>PHOTO APP</h1></Link>
        <div className="nav-top-right">
          {user.settings.dark_mode ? <Sun onClick={() => switchDarkMode(user, setUser)}/> : <Moon onClick={() => switchDarkMode(user, setUser)}/>}
          {user.token ? <Link to="/post"><Upload/></Link> : <Link to="/auth"><h5>LOGIN</h5></Link>}
          {user.token && <Link to="/profile"><ProfilePicture user={user} heightWidth={25} disable/></Link>}
        </div>
      </div>
      {user.token &&
        <div className="nav-bottom">
          <div className="nav-bottom-left">
            <NavLink to="/"><p>Wall</p></NavLink>
            <NavLink to="/discover"><p>Discover</p></NavLink>
            <NavLink to="/profile"><p>Profile</p></NavLink>
            <NavLink to="/settings"><p>Settings</p></NavLink>
          </div>
        </div>}
    </nav>
  )
}

export default withRouter(Nav)