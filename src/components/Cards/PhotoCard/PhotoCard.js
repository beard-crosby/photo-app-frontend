import React, { useState, useEffect } from 'react'
import ProfileCard from '../ProfileCard'
import { withRouter } from 'react-router-dom'
import styles from './_PhotoCard.module.scss'
import PropTypes from 'prop-types'
import { Heart, ChevronUp, ChevronDown } from 'react-feather'
import { updateFavourites } from '../../../shared/authRequests'
import { textareaGrow, removeKey } from '../../../shared/utility'
import FormSection from '../../UI/FormSection'
import { updateTitle, updateDescription, deletePost } from '../../../shared/postRequests'
import Button from '../../UI/Button'
import Spinner from '../../Spinner'

const PhotoCard = ({ user, setUser, post, history }) => {
  const [ heartClicked, setHeartClicked ] = useState("undefined")
  const [ descClicked, setDescClicked ] = useState(false)
  const [ imgClicked, setImgClicked ] = useState("undefined")
  const [ edit, setEdit ] = useState(false)
  const [ del, setDel ] = useState(false)
  const [ spinner, setSpinner ] = useState(false)
  const [ form, setForm ] = useState({
    title: post.title,
    description: post.description,
  })
  
  const isAuthor = user._id === post.author._id // Ditermine if the user is the author of this post.

  useEffect(() => { // Check if the _id in updateFavouritesError matches this post.
    user.favourites.forEach(fav => post._id === fav._id && setHeartClicked(styles.heartClicked)) // Check if this post is in user.favourites. If it is, setHeartClicked().
    if (user.updateFavouritesError === post._id) {
      setHeartClicked("undefined") // Remove class from setHeartClicked().
      setUser(removeKey(user, "updateFavouritesError")) // Remove "updateFavouritesError" from user context.
    }
  }, [user, setUser, post])

  const clickedHandler = e => {
    if (!document.getElementById(`desc-btn-${post._id}`).contains(e.target)) { // If user isn't clicking on description btn.
      if (e.target.nodeName.toLowerCase() === "path" || e.target.nodeName.toLowerCase() === "svg") { // If user clicks on heart.
        if (heartClicked === "undefined") {
          setHeartClicked(styles.heartClicked)
          updateFavourites(user, setUser, post, "add", history)
        } else {
          setHeartClicked("undefined")
          updateFavourites(user, setUser, post, "remove", history)
        }
      } else { // Else if user has clicked on the image.
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

  const editBtnClickedHandler = () => {
    const switchEditDel = closeBoth => {
      closeBoth ? setEdit(false) : setEdit(!edit) 
      setDel(false)
    }
    if (edit === true) { // If the title or description has changed, send the relevant request.
      post.title === form.title && post.description === form.description && switchEditDel()
      post.title !== form.title && updateTitle({ ...post, title: form.title }, user, setUser, setSpinner, switchEditDel, history)
      post.description !== form.description && updateDescription({ ...post, description: form.description }, user, setUser, setSpinner, switchEditDel, history)
    } else {
      switchEditDel()
    }
  }

  const delBtnClickedHandler = () => {
    setDel(!del)
    setEdit(false)
  }

  return (
    <div className={`${styles.photoCard} ${imgClicked} ${!isAuthor && styles.postSettings} ${user.settings.dark_mode && styles.darkMode}`}>
      <div className={`${styles.imgWrapper} ${edit && styles.imgOpacity} ${del && styles.imgOpacity}`} onClick={e => !edit && !del && clickedHandler(e)}>
        <img alt="Post" src={post.img}/>
        {spinner ? <Spinner user={user}/> : 
        <>
          {edit && <div className={styles.edit}>
            <FormSection text={"Title"} user={user} form={form} setForm={setForm} maxLength="60" defaultValue={post.title}/>
            <FormSection text={"Description"} user={user} form={form} setForm={setForm} onFocus={e => textareaGrow(e)} defaultValue={post.description} maxLength="300" textarea/>
          </div>}
          {del && <div className={styles.del}>
            <h5 style={{ marginBottom: 10 }}>Are you sure?</h5>
            <Button text="Delete" onClick={() => deletePost(post, user, setUser, history, setDel)} border boxShadow/>
          </div>}
          {!edit && !del && <div className={styles.hoverOverlay}>
            <div className={styles.top}>
              <h5>{post.title}</h5>
              {!isAuthor && <Heart className={heartClicked}/>}
            </div>
            {post.description && <div className={styles.bottom}>
              <Button text="Description" icon={descClicked ? <ChevronDown/> : <ChevronUp/>} id={`desc-btn-${post._id}`} onClick={() => setDescClicked(!descClicked)} iconRight/>
              {descClicked && <p>{post.description}</p>}
            </div>}
          </div>}
        </>}
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarWrapper}>
          <ProfileCard user={post.author} style={{ padding: 10 }} sidebar/>
          <div className={styles.comments}>
          {/* comments section code */}
          </div>
          {!isAuthor ? <input type="text" name="comment" placeholder="Write a comment"/> :
          <div className={styles.postSettings}>
            <div className={styles.editBtn} onClick={() => !spinner && editBtnClickedHandler()}>
              {edit ? <p>Done</p> : <p>Edit</p>}
            </div>
            <div className={styles.deleteBtn} onClick={() => !spinner && delBtnClickedHandler()}>
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