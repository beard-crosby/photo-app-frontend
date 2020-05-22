import React from 'react'
import styles from './_Following.module.scss'
import FollowingCard from '../Cards/FollowingCard'
import { MoreHorizontal } from 'react-feather'

const Following = ({ user }) => 
  <div className={styles.followingWrapper}>
    <div className={styles.top}>
      <h5>FOLLOWING</h5>
      <MoreHorizontal/>
    </div>
    <div className={styles.following}>
      {user.following.map((followed, i) => <FollowingCard key={i} followed={followed}/>)}
    </div>
  </div>

export default Following