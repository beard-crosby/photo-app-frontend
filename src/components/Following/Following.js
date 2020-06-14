import React from 'react'
import styles from './_Following.module.scss'
import ProfileCard from '../Cards/ProfileCard'
import { MoreHorizontal } from 'react-feather'

const Following = ({ user }) => 
  <div className={styles.followingWrapper}>
    <div className={styles.top}>
      <h5>FOLLOWING</h5>
      <MoreHorizontal/>
    </div>
    <div className={styles.following}>
    {user.following.map((followed, i) => <ProfileCard key={i} user={followed} style={{ padding: "5px 15px" }} sidebar/>)}
    </div>
  </div>

export default Following