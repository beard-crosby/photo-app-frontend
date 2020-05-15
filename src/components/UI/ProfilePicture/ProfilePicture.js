import React from 'react'
import styles from './_ProfilePicture.module.scss'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfilePicture = ({ user, style, heightWidth, disable, following, history }) => 
  <div 
    className={`${styles.profilePicture} ${disable && styles.disable}`} 
    style={{ ...style, height: heightWidth, width: heightWidth }} 
    onClick={() => {following ? history.push("/profile") : !disable && history.push("/changepp")}}>
    <img 
      alt="Profile" 
      style={{ ...style, height: heightWidth }} 
      src={user.profile_picture ? user.profile_picture : require('../../../static/defaults/placeholder.png')}/>
    {following ? <p>Profile</p> : !disable && <p>Change</p>}
  </div>

ProfilePicture.propTypes = {
  user: PropTypes.object, // User Object in context.
  style: PropTypes.object, // Can change style on Component call.
  heightWidth: PropTypes.number, // Height and Width of component.
  disable: PropTypes.bool, // Disable hover and onClick events and remove text.
  following: PropTypes.bool, // Enable following mode. Changes text and redirect. 
}

export default withRouter(ProfilePicture)