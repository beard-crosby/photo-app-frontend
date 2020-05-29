import React, { useState, useEffect } from 'react'
import styles from './_FavouritesCard.module.scss'
import { ChevronUp, ChevronDown } from 'react-feather'
import { removeKey } from '../../../shared/utility'
import Masonry from '../../Masonry'
import PropTypes from 'prop-types'

const Favourites = ({ user, setUser }) => {
  const [ wrapperHeight, setWrapperHeight ] = useState(null)

  const clickListener = e => { // If clickEvent outside of the wrapper, setWrapperHeight.
    const wrapper = document.getElementById("favourites-wrapper")
    if (e.target.tagName !== "svg" && e.target.tagName !== "path" && !wrapper.contains(e.target) && wrapper.style.height === "100%") {
      setWrapperHeight(null)
    }
  }
  
  useEffect(() => { // add eventListener onLoad and cleanup eventListener on when component unmounts.
    let profileCol = document.getElementById("profile-col")
    if (wrapperHeight) {
      profileCol.style.justifyContent = "flex-end"
    } else {
      setTimeout(() => profileCol.style.justifyContent = "flex-start", 300) // Wait for transition to finish before style change.
    }
    document.addEventListener("click", clickListener)
    return () => {
      document.removeEventListener("click", clickListener)
      setUser(removeKey(user, "postClicked")) // Remove postClicked from context on component unmount.
    }
  }, [wrapperHeight]) // eslint-disable-line react-hooks/exhaustive-deps

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

Favourites.propTypes = {
  user: PropTypes.object.isRequired,  // User object from context.
  setUser: PropTypes.func.isRequired, // setUser function from context.
}

export default Favourites