import React, { useState, useEffect } from 'react'
import styles from './_Overlay.module.scss'
import Button from '../UI/Button'
import { Upload } from 'react-feather'
import { withRouter } from 'react-router-dom'

const Overlay = ({ user, history }) => {
  const [ display, setDisplay ] = useState(false)

  useEffect(() => {
    switch (history.location.pathname) {
      case "/": setDisplay(true); break
      case "/discover": setDisplay(true); break
      case "/profile": setDisplay(true); break
      case "/settings": setDisplay(true); break
      default: setDisplay(false)
    }
  }, [history.location.pathname, setDisplay])

  return display && user.token ? (
    <div className={styles.overlay}>
      <div className={styles.left}>

      </div>
      <div className={styles.right}>
        <Button text="Post" icon={<Upload/>} redirect={"/post"} border/>
      </div>
    </div>
  ) : null
}

export default withRouter(Overlay)