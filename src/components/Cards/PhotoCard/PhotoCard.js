import React, { useState, useEffect } from 'react'
import ProfileCard from '../ProfileCard'
import { withRouter } from 'react-router-dom'
import styles from './_PhotoCard.module.scss'
import PropTypes from 'prop-types'
import { MoreHorizontal, Heart, ChevronDown, ChevronUp } from 'react-feather'
import { updateFavourites } from '../../../shared/authRequests'
import { textareaGrow, removeKey } from '../../../shared/utility'
import FormSection from '../../UI/FormSection'
import { updateTitle, updateDescription, deletePost } from '../../../shared/postRequests'
import Button from '../../UI/Button'
import Spinner from '../../Spinner'

const PhotoCard = ({ user, setUser, post, history }) => {
  const [ heartClicked, setHeartClicked ] = useState("undefined")
  const [ imgClicked, setImgClicked ] = useState(false)
  const [ overlay, setOverlay ] = useState(null)
  const [ spinner, setSpinner ] = useState(false)
  const [ form, setForm ] = useState({
    title: post.title,
    description: post.description,
  })
  
  const isAuthor = user._id === post.author._id // Ditermine if the user is the author of this post.

  useEffect(() => {
    user.favourites.forEach(fav => post._id === fav._id && setHeartClicked(styles.heartClicked)) // Check if this post is in user.favourites. If it is, setHeartClicked().
    imgClicked ? document.body.style.overflow = "hidden" : document.body.style = "none" // If img is fullscreen, disable scrolling. 
    if (user.updateFavouritesError === post._id) { // Check if the _id in updateFavouritesError matches this post.
      setHeartClicked("undefined") // Remove class from setHeartClicked().
      setUser(removeKey(user, "updateFavouritesError")) // Remove "updateFavouritesError" from user context.
    }
  }, [user, setUser, post, imgClicked])

  const overlayBtnsHandler = passed => {
    if (overlay === "edit") { // If Title or Description have changed, send the relevant request.
      post.title === form.title && post.description === form.description && passed === overlay ? setOverlay(null) : setOverlay(passed)
      post.title !== form.title && updateTitle({ ...post, title: form.title }, user, setUser, setSpinner, setOverlay, history)
      post.description !== form.description && updateDescription({ ...post, description: form.description }, user, setUser, setSpinner, setOverlay, history)
    } else {
      passed === overlay ? setOverlay(null) : setOverlay(passed)
    }
  }

  return (
    <div className={`${styles.photoCard} ${imgClicked && styles.imgClicked} ${!isAuthor && styles.postSettings} ${user.settings.dark_mode && styles.darkMode}`}>
      <div className={`${styles.imgWrapper} ${overlay && styles.imgOpacity}`} onClick={() => overlay === null && setImgClicked(!imgClicked)}>
        <img alt="Post" src={post.img}/>
        {spinner ? <Spinner user={user} noBG/> : 
        <>
          {overlay === "edit" && <div className={styles.edit}>
            <FormSection text={"Title"} user={user} form={form} setForm={setForm} maxLength="60" defaultValue={post.title}/>
            <FormSection text={"Description"} user={user} form={form} setForm={setForm} onFocus={e => textareaGrow(e)} defaultValue={post.description} maxLength="300" textarea/>
          </div>}
          {overlay === "del" && <div className={styles.del}>
            <h5 style={{ marginBottom: 10 }}>Are you sure?</h5>
            <Button text="Delete" onClick={() => deletePost(post, user, setUser, history, setOverlay)} border boxShadow/>
          </div>}
        </>}
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarWrapper}>
          <ProfileCard user={post.author} style={{ padding: 10 }} sidebar/>
          <div className={styles.uiBar}>
            <Button text="Details" icon={<ChevronDown/>} iconRight p/>
            <Heart/>
            <MoreHorizontal/>
          </div>
          <div className={styles.comments}>
          {/* comments section code */}
          </div>
          {!isAuthor ? <input type="text" name="comment" placeholder="Write a comment"/> :
          <div className={styles.postSettings}>
            <div className={styles.editBtn} onClick={() => !spinner && overlayBtnsHandler("edit")}>
              {overlay === "edit" ? <p>Done</p> : <p>Edit</p>}
            </div>
            <div className={styles.deleteBtn} onClick={() => !spinner && overlayBtnsHandler("del")}>
              {overlay === "del" ? <p>Back</p> : <p>Delete</p>}
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