import React from 'react'
import styles from './_FavouritesCard.module.scss'
import { MoreHorizontal } from 'react-feather'
import Masonry from '../../Masonry'

const Favourites = ({ user }) => 
  <div className={styles.favouritesWrapper}>
    <div className={styles.top}>
      <h5>FAVOURITES</h5>
      <MoreHorizontal/>
    </div>
    <div className={styles.favourites}>
      <Masonry array={user.favourites} contained/>
    </div>
  </div>

export default Favourites