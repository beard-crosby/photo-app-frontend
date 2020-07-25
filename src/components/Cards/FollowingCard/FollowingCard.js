import React from 'react'
import styles from './_FollowingCard.module.scss'
import ProfileCard from '../ProfileCard'
import { MoreHorizontal } from 'react-feather'
import PropTypes from 'prop-types'

const FollowingCard = ({ user, setUser, history }) => 
  <div className={styles.followingCardWrapper}>
    <div className={styles.top}>
      <h5>FOLLOWING</h5>
      <MoreHorizontal/>
    </div>
    <div className={styles.followingCard}>
      {user.following.map((followed, i) => 
        <ProfileCard 
          key={i} 
          user={followed} 
          setUser={setUser}
          style={{ padding: "5px 10px" }}
          history={history}
          sidebar
        />
      )}
    </div>
  </div>

FollowingCard.propTypes = {
  user: PropTypes.object.isRequired,  // User object from context.
  setUser: PropTypes.func.isRequired, // setUser function from context.
  history: PropTypes.object.isRequired, // history object from react-router-dom.
}

export default FollowingCard