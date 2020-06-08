import React, { useState, useEffect } from 'react'
import ProfileCard from '../ProfileCard'
import { withRouter } from 'react-router-dom'
import styles from './_PhotoCard.module.scss'
import PropTypes from 'prop-types'
import { Heart, ChevronUp, ChevronDown } from 'react-feather'
import { updateFavourites } from '../../../shared/authRequests'
import { removeKey } from '../../../shared/utility'
import FormSection from '../../UI/FormSection'
import { updateTitle, updateDescription, deletePost } from '../../../shared/postRequests'
import Button from '../../UI/Button'

const PhotoCard = ({ user, setUser, post, history }) => {
  const [ heartClicked, setHeartClicked ] = useState("undefined")
  const [ descClicked, setDescClicked ] = useState(false)
  const [ imgClicked, setImgClicked ] = useState("undefined")
  const [ edit, setEdit ] = useState(false)
  const [ del, setDel ] = useState(false)
  const [ form, setForm ] = useState({
    title: post.title,
    description: post.description,
  })
  // Ditermine if the user is the author of this post.
  const isAuthor = user._id === post.author._id

  useEffect(() => { // Check if this post is in user.favourites. If it is, setHeartClicked().
    user.favourites.forEach(fav => post._id === fav._id && setHeartClicked(styles.heartClicked))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { // Check if the _id in updateFavouritesError matches this post.
    if (user.updateFavouritesError === post._id) {
      setHeartClicked("undefined") // Remove class from setHeartClicked().
      setUser(removeKey(user, "updateFavouritesError")) // Remove "updateFavouritesError" from user context.
    }
  }, [user, setUser, post])

  const clickedHandler = e => { // If user clicks on heart.
    if (!document.getElementById(`desc-btn-${post._id}`).contains(e.target)) {
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
  }
  
  const editClosedHandler = () => { // If the title or description has changed, send the relevant request.
    post.title !== form.title && updateTitle({ ...post, title: form.title }, user, setUser, history)
    post.description !== form.description && updateDescription({ ...post, description: form.description }, user, setUser, history) 
  }

  const descriptionHeight = e => {
    if (e.target.clientHeight < 100) e.target.style.height = "100px"
  }

  return (
    <div className={`${styles.photoCard} ${imgClicked} ${!isAuthor && styles.postSettings} ${user.settings.dark_mode && styles.darkMode}`}>
      <div className={`${styles.imgWrapper} ${edit && styles.imgOpacity} ${del && styles.imgOpacity}`} onClick={e => !edit && !del && clickedHandler(e)}>
        <img alt="Post" src={post.img}/>
        {edit && <div className={styles.edit}>
          <FormSection text={"Title"} user={user} form={form} setForm={setForm} maxLength="60" defaultValue={post.title}/>
          <FormSection text={"Description"} user={user} form={form} setForm={setForm} onFocus={e => descriptionHeight(e)} defaultValue={post.description} maxLength="300" textarea/>
        </div>}
        {del && <div className={styles.del}>
          <h5 style={{ marginBottom: 10 }}>Are you sure?</h5>
          <Button text="Delete" onClick={() => deletePost(post, user, setUser, history, setDel)} border boxShadow/>
        </div>}
        {!edit && !del && <div className={styles.hoverOverlay}>
          <div className={styles.top}>
            <h5>{post.title}</h5>
            {!isAuthor && <Heart className={heartClicked} id={`fav-btn-${post._id}`}/>}
          </div>
          {post.description && <div className={styles.bottom}>
            <Button text="Description" icon={descClicked ? <ChevronDown/> : <ChevronUp/>} id={`desc-btn-${post._id}`} onClick={() => setDescClicked(!descClicked)} iconRight/>
            {descClicked && <p>{post.description}</p>}
          </div>}
        </div>}
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarWrapper}>
          <ProfileCard user={post.author} style={{ padding: 10 }} sidebar/>
          <div className={styles.comments}>
          {/* comments section code */}
          </div>
          {!isAuthor ? <input type="text" name="comment" placeholder="Write a comment"/> :
          <div className={styles.postSettings}>
            <div className={styles.editBtn} onClick={() => {
              setEdit(!edit) 
              setDel(false)
            }}>
              {edit ? <p onClick={() => editClosedHandler()}>Done</p> : <p>Edit</p>}
            </div>
            <div className={styles.deleteBtn} onClick={() => {
              setDel(!del)
              setEdit(false)
            }}>
              {del ? <p>Back</p> : <p>Delete</p>}
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