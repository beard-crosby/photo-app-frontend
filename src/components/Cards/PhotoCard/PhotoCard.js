import React, { useState } from 'react'
import ProfileCard from '../ProfileCard'
import styles from './_PhotoCard.module.scss'
import PropTypes from 'prop-types'
import { Maximize2, Heart } from 'react-feather'

const PhotoCard = ({ user, post, author }) => {
  const [ imgClicked, setImgClicked ] = useState("undefined")
  const [ heartClicked, setHeartClicked ] = useState("undefined")
  const [ edit, setEdit ] = useState(false)
  const isAuthor = user._id === author._id

  const maximiseClickedHandler = () => {
    if (imgClicked === "undefined") {
      setImgClicked(styles.imgClicked)
      document.body.style.overflow = "hidden"
    } else {
      setImgClicked("undefined")
      document.body.style = "none"
    }
  }

  const favouriteClickedHandler = () => {
    if (heartClicked === "undefined") {
      setHeartClicked(styles.heartClicked)
    } else {
      setHeartClicked("undefined")
    }
  }

  return (
    <div className={`${styles.photoCard} ${imgClicked} ${!isAuthor && styles.postSettings} ${user.settings.dark_mode && styles.darkMode}`}>
      <div className={`${styles.imgWrapper} ${edit && styles.showEdit}`}>
        <img alt="Post" src={post.img}/>
          {!edit && !isAuthor && <div className={styles.svgBar}>
            <Heart className={heartClicked} onClick={() => favouriteClickedHandler()}/>
            <Maximize2 onClick={() => maximiseClickedHandler()}/>
          </div>}
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarWrapper}>
          <ProfileCard user={author} style={{ padding: 10 }} sidebar/>
          <div className={styles.comments}>

          </div>
          {!isAuthor ? <input type="text" name="comment" placeholder="Write a comment" /> :
          <div className={styles.postSettings}>
            <div className={styles.editBtn} onClick={() => setEdit(!edit)}>
              <h5>Edit</h5>
            </div>
            <div className={styles.deleteBtn}>
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