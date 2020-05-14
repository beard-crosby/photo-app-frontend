import React, { useEffect, useState } from 'react'
import styles from './_PhotoCard.module.scss'
import { MessageSquare } from "react-feather"
import PropTypes from 'prop-types'

const PhotoCard = ({ img, user, comments }) => {
  const [imgClicked, setImgClicked] = useState(null)
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {window.matchMedia("(min-width: 800px)").matches && setShowComments(true)}, [])

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
        {img}
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarWrapper}>
          <div className={styles.creator}>
            <div className={styles.profilePictureWrapper}>
              <img alt="Profile" src={user.profile_picture ? user.profile_picture : require('../../static/defaults/placeholder.png')}/>
            </div>
            <div className={styles.creatorInfo}>
              <h5>{user.name}</h5>
              <div className={styles.commentsBtn} onClick={() => setShowComments(!showComments)}>
                <p>Comments</p>
                <MessageSquare/>
              </div>
            </div>
          </div>
          {comments.length > 0 && showComments && <div className={styles.comments}>
            {comments.map((comment, i) => (
              <div className={styles.comment} key={i}>
                <img alt="Profile" src={require(`../../static/defaults/${comment.profile_picture}`)}/>
                <p>{comment.comment}</p>
              </div>
            ))}
          </div>}
          <input type="text" name="comment" placeholder="Write a comment" />
        </div>
      </div>
    </div>
  )
}

PhotoCard.propTypes = {
  img: PropTypes.element, // The image. Height of the image decides the height of the component thus preserving aspect ratio.
  user: PropTypes.object, // Author of the post.
  comments: PropTypes.array // An array of the comments on this post.
}

export default PhotoCard