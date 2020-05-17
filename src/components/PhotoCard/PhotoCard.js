import React, { useState } from 'react'
import ProfileCard from '../ProfileCard'
import styles from './_PhotoCard.module.scss'
import PropTypes from 'prop-types'

const PhotoCard = ({ post, author }) => {
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
    <div className={`${styles.photoCardWrapper} ${imgClicked}`}>
      <div className={styles.imgWrapper} onClick={() => imgClickedHandler()}>
        <img alt="Post" src={post.img}/>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarWrapper}>
          <ProfileCard user={author} style={{ padding: 10 }} sidebar/>
          <input type="text" name="comment" placeholder="Write a comment" />
        </div>
      </div>
    </div>
  )
}

PhotoCard.propTypes = {
  post: PropTypes.object, // Post Object.
  author: PropTypes.object, // Author Object.
}

export default PhotoCard