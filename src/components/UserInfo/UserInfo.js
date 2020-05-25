import React, { useEffect } from 'react'
import styles from './_UserInfo.module.scss'
import { withRouter } from 'react-router-dom'
import { updateInfo } from '../../shared/authRequests'
import { removeKey } from '../../shared/utility'
import { MoreHorizontal, Edit2 } from 'react-feather'

const UserInfo = ({ user, setUser, history }) => {
  const growHandler = () => {
    setUser({ ...user, aboutFocused: true })
    document.getElementById("user-info-wrapper").style.height = "100%"
    const aboutTextarea = document.getElementById("about-textarea")
    aboutTextarea.focus()
    aboutTextarea.select()
  }

  const shrinkHandler = () => {
    setUser(removeKey(user, "aboutFocused"))
    document.getElementById("user-info-wrapper").style.height = "170px"
    const aboutValue = document.getElementById("about-textarea").value
    if (user.info.about !== aboutValue) {
      setUser({ ...removeKey(user, "aboutFocused"), info: { ...user.info, about: aboutValue } })
      updateInfo({ ...user, info: { ...user.info, about: aboutValue }}, setUser, history)
    }
  }

  const infoWrapperClicked = () => {
    const infoWrapper = document.getElementById("user-info-wrapper")
    document.addEventListener("click", e => {
      if (e.target.tagName !== "svg" && e.target.tagName !== "path" && !infoWrapper.contains(e.target) && infoWrapper.style.height === "100%") {
        shrinkHandler()
      }
    })
  }

  return (
    <div className={styles.userInfoWrapper} id="user-info-wrapper" onClick={() => infoWrapperClicked()}>
      <div className={styles.top}>
        {user.aboutFocused ? <h5>WRITE ABOUT YOU</h5> : <h5>ABOUT</h5>}
        {!user.aboutFocused ? <MoreHorizontal/> : <h5 onClick={() => shrinkHandler()}>DONE</h5>}
      </div>
      <div className={styles.userInfo}>
        <textarea 
          type="text"
          name="about"
          id="about-textarea"
          defaultValue={user.info.about}
          onFocus={() => growHandler()}/>
        {!user.aboutFocused && <Edit2 onClick={() => growHandler()}/>}
      </div>
    </div>
  )
}

export default withRouter(UserInfo)