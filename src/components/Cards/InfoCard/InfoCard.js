import React, { useState, useEffect } from 'react'
import styles from './_InfoCard.module.scss'
import { withRouter } from 'react-router-dom'
import { updateInfo } from '../../../shared/authRequests'
import { MoreHorizontal, Edit2 } from 'react-feather'
import PropTypes from 'prop-types'

const InfoCard = ({ user, setUser, history }) => {
  const [ wrapperHeight, setWrapperHeight ] = useState(null)

  const growHandler = () => { // Grow component to 100% of the containers height and focus the textarea.
    setWrapperHeight("100%")
    const textarea = document.getElementById("about-textarea")
    textarea.focus()
    textarea.select()
  }

  const shrinkHandler = () => { // Shrink component back to its original state.
    setWrapperHeight(null)
    const textarea = document.getElementById("about-textarea").value
    if (user.info.about !== textarea) { // If context value !== textarea value.
      setUser({ ...user, info: { ...user.info, about: textarea } })
      updateInfo({ ...user, info: { ...user.info, about: textarea }}, setUser, history)
    }
  }
  
  const clickListener = e => { // If clickEvent outside of the wrapper, setWrapperHeight.
    const wrapper = document.getElementById("user-info-wrapper")
    if (e.target.tagName !== "svg" && e.target.tagName !== "path" && !wrapper.contains(e.target) && wrapper.style.height === "100%") {
      shrinkHandler()
    }
  }

  useEffect(() => { // add eventListener onLoad and cleanup eventListener on when component unmounts.
    document.addEventListener("click", clickListener)
    return () => document.removeEventListener("click", clickListener)
  }, [wrapperHeight])

  return (
    <div className={styles.infoCardWrapper} id="user-info-wrapper" style={{ height: wrapperHeight }}>
      <div className={styles.top}>
        {wrapperHeight ? <h5>WRITE ABOUT YOU</h5> : <h5>ABOUT</h5>}
        {!wrapperHeight ? <MoreHorizontal/> : <h5 onClick={() => shrinkHandler()}>DONE</h5>}
      </div>
      <div className={styles.infoCard}>
        <textarea 
          type="text"
          name="about"
          id="about-textarea"
          placeholder="Write about you!"
          defaultValue={user.info.about}
          onFocus={() => growHandler()}/>
        {!wrapperHeight && <Edit2 onClick={() => growHandler()}/>}
      </div>
    </div>
  )
}

InfoCard.propTypes = {
  user: PropTypes.object.isRequired,  // User object from context.
  setUser: PropTypes.func.isRequired, // setUser function from context.
}

export default withRouter(InfoCard)