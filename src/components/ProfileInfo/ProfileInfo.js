import React from 'react'
import styles from './_ProfileInfo.module.scss'
import ProfilePicture from '../UI/ProfilePicture'
import PropTypes from 'prop-types'

const ProfileInfo = ({ user, style }) => 
  <div className={styles.profile} style={style}>
    <ProfilePicture user={user} style={{ margin: "0 20px 0 0" }}/>
    <div className={styles.ProfileInfo}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {user.website && <p>{user.website}</p>}
    </div>
  </div>

ProfileInfo.propTypes = {
  user: PropTypes.object, // User Object in context.
  style: PropTypes.object, // Can change style on Component call.
}

export default ProfileInfo