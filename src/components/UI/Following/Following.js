import React from 'react'
import styles from './_Following.module.scss'
import FollowingCard from '../../Cards/FollowingCard'

const Following = ({ user }) => 
  <div className={`model ${styles.followingWrapper}`}>
    <div className="top">
      <h5 className="title-left">FOLLOWING</h5>
    </div>
    <div className={`middle ${styles.following}`} id="following">
      {user.following.map((followed, i) => <FollowingCard key={i} followed={followed}/>)}
    </div>
  </div>

export default Following