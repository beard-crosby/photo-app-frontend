import React from 'react'
import styles from './_ProfileCard.module.scss'
import ProfilePicture from '../../UI/ProfilePicture'
import PropTypes from 'prop-types'
import { Edit2 } from 'react-feather'

const ProfileCard = ({ user, style, sidebar, isAuthor }) =>
  <div className={`${sidebar ? styles.sidebar : styles.profile} ${isAuthor && styles.isAuthor}`} style={style}>
    <ProfilePicture user={user} disable={sidebar} heightWidth={sidebar ? 40 : 80} style={{ marginRight: sidebar ? 10 : 20 }}/>
    <div className={styles.profileInfo}>
      {sidebar && <p className={styles.viewProfile}>View Profile</p>}
      {sidebar ? <p>{user.name}</p> : <h2>{user.name}</h2>}
      {!sidebar && user.email && user.settings.display_email && <p>{user.email}</p>}
      {!sidebar && user.website && user.settings.display_website && <p>{user.website}</p>}
    </div>
    {!sidebar && <Edit2/>}
  </div>

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired,  // User Object in context.
  style: PropTypes.object,            // Can change style on Component call.
  sidebar: PropTypes.bool,            // Style for the top of a comments section.
  isAuthor: PropTypes.bool,           // Check if own user is being displayed.
}

export default ProfileCard