import React, { useState } from 'react'
import styles from './_ProfilePicture.module.scss'
import PropTypes from 'prop-types'
import { getInitials } from '../../../shared/utility'

const ProfilePicture = ({ user, setUser, style, heightWidth, disable, following, history }) => {
  const [ isTall, setIsTall ] = useState(false)
  // Check if the image is portrait or landscape and apply correct style to img.
  const heighOrWide = e => setIsTall(e.target.clientWidth < e.target.clientHeight)

  let initials = <p>{getInitials(user)}</p>
  switch (heightWidth) {
    case 40: initials = <h4>{getInitials(user)}</h4>; break
    case 80: initials = <h1>{getInitials(user)}</h1>; break
    default: initials = <p>{getInitials(user)}</p>
  }

  const changePPHandler = () => {
    setUser({...user, changePP: true})
    history.push("/settings")
  }

  return (
    <div 
      className={`${styles.profilePicture} ${disable && styles.disable} ${!user.profile_picture && styles.initials}`} 
      style={{ ...style, height: heightWidth, width: heightWidth }} 
      onClick={() => {following ? history.push("/profile") : !disable && changePPHandler()}}>
      {user.profile_picture ? 
        <img 
          id="profile-picture"
          alt="Profile" 
          style={isTall ? { width: heightWidth } : { height: heightWidth }} 
          src={user.profile_picture} 
          onLoad={e => heighOrWide(e)}
        /> 
      :
        initials}
      {!disable && <h3>Change</h3>}
    </div>
  )
}

ProfilePicture.propTypes = {
  user: PropTypes.object.isRequired,    // User Object in context.
  setUser: PropTypes.func.isRequired,   // setUser function from context.
  style: PropTypes.object,              // Can change style on Component call.
  heightWidth: PropTypes.number,        // Height and Width of component.
  disable: PropTypes.bool,              // Disable hover and onClick events and remove text.
  following: PropTypes.bool,            // Enable following mode. Changes text and redirect.
  history: PropTypes.object.isRequired, // History object from react-router-dom. 
}

export default ProfilePicture