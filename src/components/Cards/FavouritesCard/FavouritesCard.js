import React, { useState, useEffect } from 'react'
import styles from './_FavouritesCard.module.scss'
import { ChevronUp, ChevronDown } from 'react-feather'
import Masonry from '../../Masonry'

const Favourites = ({ user, setUser }) => {
  const [ wrapperHeight, setWrapperHeight ] = useState(null)
  
  useEffect(() => {
    let profileCol = document.getElementById("profile-col")
    if (wrapperHeight) {
      profileCol.style.justifyContent = "flex-end"
    } else {
      setTimeout(() => profileCol.style.justifyContent = "flex-start", 300)
    }
  }, [wrapperHeight])

  return (
    <div className={styles.favouritesWrapper} id="favourites-wrapper" style={{ height: wrapperHeight }}>
      <div className={styles.top}>
        <h5>FAVOURITES</h5>
        {wrapperHeight === null ? 
        <ChevronUp onClick={() => setWrapperHeight("100%")}/> :
        <ChevronDown onClick={() => setWrapperHeight(null)}/>}
      </div>
      <div className={styles.favourites}>
        <Masonry array={user.favourites} user={user} setUser={setUser} contained/>
      </div>
    </div>
  )
}

export default Favourites