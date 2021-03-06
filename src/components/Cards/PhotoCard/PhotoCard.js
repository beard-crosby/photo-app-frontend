import React, { useState, useEffect } from 'react'
import ProfileCard from '../ProfileCard'
import styles from './_PhotoCard.module.scss'
import PropTypes from 'prop-types'
import moment from 'moment'
import { MoreHorizontal, Heart, ChevronDown, ChevronUp } from 'react-feather'
import { updateFavourites } from '../../../shared/authRequests'
import { textareaGrow } from '../../../shared/utility'
import FormSection from '../../UI/FormSection'
import { updateTitle, updateDescription, deletePost } from '../../../shared/postRequests'
import { createComment } from '../../../shared/commentRequests'
import Button from '../../UI/Button'
import Spinner from '../../Spinner'
import Comment from './Comment'

const PhotoCard = ({ user, setUser, wall, setWall, post, setPostClicked, history }) => {
  const [ favClicked, setFavClicked ] = useState("undefined")
  const [ imgClicked, setImgClicked ] = useState(false)
  const [ sidebar, setSidebar ] = useState(null)
  const [ overlay, setOverlay ] = useState(null)
  const [ spinner, setSpinner ] = useState(false)
  const [ comment, setComment ] = useState("")
  const [ form, setForm ] = useState({
    title: post.title,
    description: post.description,
    re_render_form: 0,
  })

  const isAuthor = user._id === post.author._id // Ditermine if the user is the author of this post.

  useEffect(() => {
    user.favourites.forEach(fav => { // Check if this post is in user.favourites. If it is, setFavClicked().
      if (post._id === fav._id) {
        setFavClicked(styles.favClicked)
        post.postClicked && setOverlay(null)
      }
    })

    imgClicked ? document.body.style.overflow = "hidden" : document.body.style = "none" // If img is fullscreen, disable scrolling.

    if (user.formErrors && user.formErrors.substring(0, user.formErrors.indexOf(" ")) === post._id) { // If formErrors starts with post._id.
      setSidebar(user.formErrors.substring(user.formErrors.indexOf(" ") + 1)) // setSidebar with everything after the first " " in the string.
    }

    if (post.postClicked) { // If user.postClicked is mutated, re-render form with new context data.
      setForm({
        title: post.title,
        description: post.description,
        re_render_form: form.re_render_form = form.re_render_form + 1, // Re-render edit form using the key prop.
      })
    }
  }, [user, setUser, post, imgClicked]) // eslint-disable-line react-hooks/exhaustive-deps

  const favClickedHandler = () => {
    if (favClicked === "undefined") {
      setFavClicked(styles.favClicked)
      updateFavourites(user, setUser, post, "add", setPostClicked, history)
    } else {
      setFavClicked("undefined")
      updateFavourites(user, setUser, post, "remove", setPostClicked, history)
    }
  }

  const overlayBtnsHandler = (passed, e) => {
    e && e.preventDefault()
    if (overlay === "edit") { // If Title or Description have changed, send the relevant request.
      post.title === form.title && post.description === form.description && passed === overlay ? setOverlay(null) : setOverlay(passed)
      post.title !== form.title && updateTitle({ ...post, title: form.title }, user, setUser, wall, setWall, setSpinner, setOverlay, setPostClicked, history)
      post.description !== form.description && updateDescription({ ...post, description: form.description }, user, setUser, wall, setWall, setSpinner, setOverlay, form.title, setPostClicked, history)
    } else {
      passed === overlay ? setOverlay(null) : setOverlay(passed)
    }
  }

  const commentHandler = e => {
    e.preventDefault()
    createComment(user, setUser, wall, setWall, post, comment, setComment, e.target.childNodes[0], history)
  }

  const sidebarJSX = sidebar => {
    switch (sidebar) {
      case "details": return (
        <>
          <Comment user={user} header="Created:" text={moment(post.created_at).fromNow()}/>
          <Comment user={user} header="Title:" text={post.title}/>
          {post.description && <Comment user={user} header="Description:" text={post.description}/>}
        </>
      )
      case "more": return isAuthor ? (
        <div className={styles.more}>
          <p onClick={() => !spinner && overlayBtnsHandler("del")}>Delete Post</p>
          <p>Disable Comments</p>
          <p onClick={() => setSidebar(null)}>Close</p>
        </div>
      ) : (
        <div className={styles.more}>
          <p>Report Inappropriate</p>
          <p>Unfollow</p>
          <p onClick={() => setSidebar(null)}>Close</p>
        </div>
      )
      case `${user.formErrors && user.formErrors.substring(user.formErrors.indexOf(" ") + 1)}`: return (
        <div className={styles.more}>
          <p>{user.formErrors && sidebar}</p>
          <p onClick={() => setSidebar(null)}>Close</p>
        </div>
      )
      default: return post.comments.map((comment, i) => <Comment key={i} user={user} setUser={setUser} comment={comment} history={history}/>)
    }
  }

  return (
    <div className={`${styles.photoCard} ${imgClicked && styles.imgClicked} ${!isAuthor && styles.postSettings} ${user.settings.dark_mode && styles.darkMode}`}>
      <div className={`${styles.imgWrapper} ${overlay && styles.imgOpacity}`} onClick={() => overlay === null && setImgClicked(!imgClicked)}>
        <img alt="Post" src={post.img}/>
        {spinner ? <Spinner user={user} noBG/> : 
        <>
          {overlay === "edit" && 
          <form className={styles.edit} onSubmit={e => overlayBtnsHandler("edit", e)} key={form.re_render_form}>
            <FormSection label={"Title"} form={form} setForm={setForm} maxLength="60" defaultValue={form.title}/>
            <FormSection label={"Description"} form={form} setForm={setForm} onFocus={e => textareaGrow(e)} defaultValue={form.description} maxLength="300" textarea/>
          </form>}
          {overlay === "del" && 
          <div className={styles.del}>
            <h5 style={{ marginBottom: 10 }}>Are you sure?</h5>
            <Button text="Delete" onClick={() => deletePost(post, user, setUser, wall, setWall, setOverlay, setSpinner, setPostClicked, history)} border boxShadow/>
          </div>}
        </>}
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarWrapper}>
          <ProfileCard user={post.author} setUser={setUser} style={{ padding: 10 }} isAuthor={isAuthor} history={history} sidebar/>
          <div className={styles.uiBar}>
            <Button text="Details" icon={sidebar === "details" ? <ChevronUp/> : <ChevronDown/>} onClick={() => sidebar === "details" ? setSidebar(null) : setSidebar("details")} iconRight p/>
            {!isAuthor && <Heart className={favClicked} onClick={() => favClickedHandler()}/>}
            <MoreHorizontal onClick={() => sidebar === "more" ? setSidebar(null) : setSidebar("more")}/>
          </div>
          <div className={styles.sidebarMain}>
            {sidebarJSX(sidebar)}
          </div>
          {!isAuthor ? 
          <form onSubmit={e => commentHandler(e)}>
            <input type="text" name="comment" placeholder="Write a comment" value={comment} onChange={e => setComment(e.target.value)}/> 
          </form> :
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
  user: PropTypes.object.isRequired,  // User Object from context.
  setUser: PropTypes.func.isRequired, // setUser function from contet.
  wall: PropTypes.array.isRequired,   // wall Array from context.
  setWall: PropTypes.func.isRequired, // setWall function from contet.
  post: PropTypes.object.isRequired,  // Post Object.
  history: PropTypes.object,          // History object from react-router-dom. 
}

export default PhotoCard