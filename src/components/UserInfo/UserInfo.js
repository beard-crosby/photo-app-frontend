import React from 'react'
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
      setUser({ ...user, info: { ...user.info, about: aboutValue } })
      updateInfo({ ...user, info: { ...user.info, about: aboutValue }}, setUser, history)
    }
  }

  return (
    <div className={styles.userInfoWrapper} id="user-info-wrapper">
      <div className={styles.top}>
        <h5>ABOUT</h5>
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