import React, { useState, useEffect } from 'react'
import ProfileCard from '../ProfileCard'
import { withRouter } from 'react-router-dom'
import styles from './_PhotoCard.module.scss'
import PropTypes from 'prop-types'
import { Heart } from 'react-feather'
import { updateFavourites } from '../../../shared/authRequests'
import { removeKey } from '../../../shared/utility'

const PhotoCard = ({ user, setUser, post, history }) => {
  const [ imgClicked, setImgClicked ] = useState("undefined")
  const [ heartClicked, setHeartClicked ] = useState("undefined")
  const [ edit, setEdit ] = useState(false)
  const isAuthor = user._id === post.author._id

  useEffect(() => { // Check ONCE if the post is a favourite. If it is, setHeartClicked().
    user.favourites.forEach(fav => {
      post._id === fav._id && setHeartClicked(styles.heartClicked)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { // If dependencies change, check if the _id in updateFavouritesError matches this post.
    if (user.updateFavouritesError === post._id) {
      setHeartClicked("undefined") // Remove class from setHeartClicked().
      setUser(removeKey(user, "updateFavouritesError")) // Remove "updateFavouritesError" from user context.
    }
  }, [user, setUser, post])

  const clickedHandler = e => { // If user clicks on heart.
    if (e.target.nodeName.toLowerCase() === "path" || e.target.nodeName.toLowerCase() === "svg") {
      if (heartClicked === "undefined") {
        setHeartClicked(styles.heartClicked)
        updateFavourites(user, setUser, post, "add", history)
      } else {
        setHeartClicked("undefined")
        updateFavourites(user, setUser, post, "remove", history)
      }
    } else { // Else = If user has clicked on the image.
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
          {/* comments section code */}
          </div>
          {!isAuthor ? <input type="text" name="comment" placeholder="Write a comment"/> :
          <div className={styles.postSettings}>
            <div className={styles.editBtn} onClick={() => setEdit(!edit)}>
              <p>Edit</p>
            </div>
            <div className={styles.deleteBtn}>
              <p>Delete</p>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}

PhotoCard.propTypes = {
  user: PropTypes.object,  // User Object from context.
  setUser: PropTypes.func, // setUser function from contet.
  post: PropTypes.object,  // Post Object.
}

export default withRouter(PhotoCard)