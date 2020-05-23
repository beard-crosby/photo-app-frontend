import React, { useState } from 'react'
import ProfileCard from '../ProfileCard'
import styles from './_PhotoCard.module.scss'
import PropTypes from 'prop-types'
import { Heart } from 'react-feather'

const PhotoCard = ({ user, post }) => {
  const [ imgClicked, setImgClicked ] = useState("undefined")
  const [ heartClicked, setHeartClicked ] = useState("undefined")
  const [ edit, setEdit ] = useState(false)
  const isAuthor = user._id === post.author._id

  const clickedHandler = e => {
    if (e.target.nodeName.toLowerCase() === "path" || e.target.nodeName.toLowerCase() === "svg") {
      if (heartClicked === "undefined") {
        setHeartClicked(styles.heartClicked)
      } else {
        setHeartClicked("undefined")
      }
    } else {
      if (imgClicked === "undefined") {
        setImgClicked(styles.imgClicked)
        document.body.style.overflow = "hidden"
      } else {
        setImgClicked("undefined")
        document.body.style = "none"
      }
    }
  }

  return (
    <div className={`${styles.photoCard} ${imgClicked} ${!isAuthor && styles.postSettings} ${user.settings.dark_mode && styles.darkMode}`}>
      <div className={`${styles.imgWrapper} ${edit && styles.showEdit}`} onClick={(e) => !edit && clickedHandler(e)}>
        <img alt="Post" src={post.img}/>
        <div className={styles.hoverOverlay}>
          <h5>{post.title}</h5>
          {!isAuthor && <Heart className={heartClicked}/>}
        </div>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarWrapper}>
          <ProfileCard user={post.author} style={{ padding: 10 }} sidebar/>
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