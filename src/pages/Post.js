import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import '../scss/_model.scss'
import Button from '../components/UI/Button'
import UploadBox from '../components/UI/UploadBox'
import { createPost } from '../shared/postRequests'

const Post = ({ history }) => {
  const { user, setUser, setLoading } = useContext(UserContext)
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    title: "",
    description: "",
  })

  const updateField = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
    })
  }

  useEffect(() => { 
    form.title.length > 0 && user.file.uploaded && setFormValid(true)
  }, [user, form])

  const onPostClicked = event => {
    event.preventDefault()
    createPost(form, user, setUser, setLoading, history)
  }

  const descriptionHeight = () => document.getElementById("description").style.height = '100px'

  return (
    <form className="model" onSubmit={event => onPostClicked(event)} style={{ width: 500 }}>
      <div className="top">
        <h5>CREATE A POST</h5>
        <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>
      </div>
      <div className="middle">
        <label htmlFor="title"><h5>Title</h5></label>
        <input 
          type="text" 
          name="title" 
          id="title"
          onChange={updateField}>
        </input>
        <label htmlFor="description"><h5>Description</h5></label>
        <textarea 
          type="text" 
          name="description" 
          id="description"
          onMouseDown={() => descriptionHeight()}
          onChange={updateField}/>
        <UploadBox user={user} setUser={setUser}/>
      </div>
      <div className="bottom">
        <p>Terms & Conditions</p>
        <Button submit disabled={!formValid} text="Post"/>
      </div>
    </form>
  )
}

export default Post