import React, { useState } from 'react'
import ProfileCard from '../ProfileCard'
import styles from './_PhotoCard.module.scss'
import PropTypes from 'prop-types'

const PhotoCard = ({ user, post, author }) => {
  const [imgClicked, setImgClicked] = useState(null)

  const imgClickedHandler = () => {
    if (imgClicked === null) {
      setImgClicked(styles.imgClicked)
      document.body.style.overflow = "hidden"
    } else {
      setImgClicked(null)
      document.body.style = "none"
    }
  }

  return (
    <div className={`${styles.photoCardWrapper} ${imgClicked} ${user._id === author._id && styles.postSettings} ${user.settings.dark_mode && styles.darkMode}`}>
      <div className={styles.imgWrapper} onClick={() => imgClickedHandler()}>
        <img alt="Post" src={post.img}/>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarWrapper}>
          <ProfileCard user={author} style={{ padding: 10 }} sidebar/>
          <div className={styles.comments}>

          </div>
          {user._id !== author._id ? <input type="text" name="comment" placeholder="Write a comment" /> :
          <div className={styles.postSettings}>
            <div className={styles.edit}>
              <h5>Edit</h5>
            </div>
            <div className={styles.delete}>
              <h5>Delete</h5>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

PhotoCard.propTypes = {
  user: PropTypes.object, // User Object from context.
  post: PropTypes.object, // Post Object.
  author: PropTypes.object, // Author Object.
}

export default PhotoCard