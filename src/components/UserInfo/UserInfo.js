import React from 'react'
import styles from './_UserInfo.module.scss'
import { MoreHorizontal, Edit2 } from 'react-feather'

const UserInfo = () => 
  <div className={styles.userInfoWrapper}>
    <div className={styles.top}>
      <h5>ABOUT</h5>
      <MoreHorizontal/>
    </div>
    <div className={styles.userInfo}>
    <Edit2/>
    </div>
  </div>

export default UserInfo