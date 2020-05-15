import React from 'react'
import styles from './_ProfileCard.module.scss'
import ProfilePicture from '../UI/ProfilePicture'
import PropTypes from 'prop-types'

const ProfileCard = ({ user, style }) => 
  <div className={styles.profile} style={style}>
    <ProfilePicture user={user} style={{ margin: "0 20px 0 0" }}/>
    <div className={styles.ProfileInfo}>
      <h2>{user.name}</h2>
      {user.settings.display_email && <p>{user.email}</p>}
      {user.website && user.settings.display_website && <p>{user.website}</p>}
    </div>
  </div>

ProfileCard.propTypes = {
  user: PropTypes.object, // User Object in context.
  style: PropTypes.object, // Can change style on Component call.
}

export default ProfileCard