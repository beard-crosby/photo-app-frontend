import React from 'react'
import styles from './_FavouritesCard.module.scss'
import { MoreHorizontal } from 'react-feather'

const Favourites = () => 
  <div className={styles.favouritesWrapper}>
    <div className={styles.top}>
      <h5>FAVOURITES</h5>
      <MoreHorizontal/>
    </div>
    <div className={styles.favourites}>
      
    </div>
  </div>

export default Favourites