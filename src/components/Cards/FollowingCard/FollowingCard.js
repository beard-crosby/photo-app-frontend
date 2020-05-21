import React from 'react'
import styles from './_FollowingCard.module.scss'
import ProfilePicture from '../../UI/ProfilePicture'
import PropTypes from 'prop-types'

const FollowingCard = ({ user, followed, style }) => 
  <div className={styles.followingCard} style={style} id="following-card">
    <ProfilePicture user={followed} disable heightWidth={40} style={{ marginRight: 10 }}/>
    <div className={styles.info}>
      {user ? <h6>{`${user.following.l} more`}</h6> : <h6 className={styles.name}>{followed.name}</h6>}
      <h6 className={styles.viewProfile}>View Profile</h6>
    </div>
  </div>

FollowingCard.propTypes = {
  user: PropTypes.object,       // User object from context.
  followed: PropTypes.object,   // Object of the followed user.
  style: PropTypes.object,      // Can change style on Component call.
}

export default FollowingCard