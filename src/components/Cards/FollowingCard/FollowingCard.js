import React from 'react'
import styles from './_FollowingCard.module.scss'
import ProfileCard from '../ProfileCard'
import { MoreHorizontal } from 'react-feather'

const FollowingCard = ({ user }) => 
  <div className={styles.followingCardWrapper}>
    <div className={styles.top}>
      <h5>FOLLOWING</h5>
      <MoreHorizontal/>
    </div>
    <div className={styles.followingCard}>
      {user.following.map((followed, i) => <ProfileCard key={i} user={followed} style={{ padding: "5px 10px" }} sidebar/>)}
    </div>
  </div>

export default FollowingCard