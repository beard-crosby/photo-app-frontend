import React from 'react'
import styles from './_FollowingCard.module.scss'
import ProfilePicture from '../../UI/ProfilePicture'
import PropTypes from 'prop-types'

const FollowingCard = ({ followed, style }) => 
  <div className={styles.followingCard} style={style}>
    <ProfilePicture user={followed} disable heightWidth={40} style={{ marginRight: 10 }}/>
    <div className={styles.info}>
      <h6 className={styles.name}>{followed.name}</h6>
      <h6 className={styles.viewProfile}>View Profile</h6>
    </div>
  </div>

FollowingCard.propTypes = {
  followed: PropTypes.object,   // Object of the followed user.
  style: PropTypes.object,      // Can change style on Component call.
}

export default FollowingCard