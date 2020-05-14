import React from 'react'
import styles from './_ProfilePicture.module.scss'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfilePicture = ({ user, style, heightWidth, history }) => 
  <div className={styles.profilePicture} style={{ ...style, height: heightWidth, width: heightWidth }} onClick={() => history.push("/profileimg")}>
    <img alt="Profile" style={{ ...style, height: heightWidth }} src={user.profile_picture ? user.profile_picture : require('../../../static/defaults/placeholder.png')}/>
    <p>Change</p>
  </div>

ProfilePicture.propTypes = {
  user: PropTypes.object, // User Object in context.
  style: PropTypes.object, // Can change style on Component call.
  heightWidth: PropTypes.number, // Height and Width of component.
}

export default withRouter(ProfilePicture)