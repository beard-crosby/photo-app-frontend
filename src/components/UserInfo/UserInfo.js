import React, { useState } from 'react'
import styles from './_UserInfo.module.scss'
import { withRouter } from 'react-router-dom'
import { updateInfo } from '../../shared/authRequests'
import { removeKey } from '../../shared/utility'
import { MoreHorizontal, Edit2 } from 'react-feather'

const UserInfo = ({ user, setUser, history }) => {
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
      setUser({ ...removeKey(user, "aboutFocused"), info: { ...user.info, about: textarea } })
      updateInfo({ ...user, info: { ...user.info, about: textarea }}, setUser, history)
    }
  }

  const isClicked = () => {
    const wrapper = document.getElementById("user-info-wrapper")
    document.addEventListener("click", e => {
      if (e.target.tagName !== "svg" && e.target.tagName !== "path" && !wrapper.contains(e.target) && wrapper.style.height === "100%") {
        shrinkHandler()
      }
    })
  }

  return (
    <div className={styles.userInfoWrapper} id="user-info-wrapper" onClick={() => isClicked()} style={{ height: wrapperHeight }}>
      <div className={styles.top}>
        {wrapperHeight ? <h5>WRITE ABOUT YOU</h5> : <h5>ABOUT</h5>}
        {!wrapperHeight ? <MoreHorizontal/> : <h5 onClick={() => shrinkHandler()}>DONE</h5>}
      </div>
      <div className={styles.userInfo}>
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

export default withRouter(UserInfo)