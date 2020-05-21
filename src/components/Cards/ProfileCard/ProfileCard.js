import React from 'react'
import styles from './_ProfileCard.module.scss'
import ProfilePicture from '../../UI/ProfilePicture'
import PropTypes from 'prop-types'

const ProfileCard = ({ user, style, sidebar }) => 
  <div className={`${styles.profile} ${sidebar && styles.sidebar}`} style={style}>
    <ProfilePicture user={user} disable={sidebar} heightWidth={sidebar && 40} style={{ marginRight: sidebar ? 10 : 20 }}/>
    <div className={styles.ProfileInfo}>
      {sidebar && <h5 className={styles.viewProfile}>View Profile</h5>}
      {sidebar ? <h5>{user.name}</h5> : <h2>{user.name}</h2>}
      {user.email && user.settings.display_email && <p>{user.email}</p>}
      {user.website && user.settings.display_website && <p>{user.website}</p>}
    </div>
  </div>

ProfileCard.propTypes = {
  user: PropTypes.object, // User Object in context.
  style: PropTypes.object, // Can change style on Component call.
  sidebar: PropTypes.bool, // Style for the top of a comments section.
}

export default ProfileCard