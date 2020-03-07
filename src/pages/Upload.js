import React, { useState } from 'react'
import '../scss/_model.scss'
import { Upload as UploadSVG } from 'react-feather'
import Button from '../components/UI/Button'

const Upload = ({ history }) => {
  const [ form, setForm ] = useState({
    img: "",
    title: "",
    description: "",
  })

  const updateField = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const onUploadClicked = event => {
    event.preventDefault()
    // request
  }

  const descriptionHeight = () => document.getElementById("description").style.height = '100px'

  return (
    <form className="model" onClick={event => onUploadClicked(event)} style={{ width: 500 }}>
      <div className="top">
        <div className="top-left">
          <h4>Post</h4>
          <UploadSVG/>
        </div>
        <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>
      </div>
      <label htmlFor="title"><h5>Title</h5></label>
      <input 
        type="text" 
        name="title" 
        id="title"
        onChange={updateField}>
      </input>
      <div className="upload-box">
        <UploadSVG/>
        <h1>Drag and Drop</h1>
      </div>
      <label htmlFor="description"><h5>Description</h5></label>
      <textarea 
        type="text" 
        name="description" 
        id="description"
        onMouseDown={() => descriptionHeight()}
        onChange={updateField}>
      </textarea>
      <Button submit text="Post"/>
    </form>
  )
}

export default Upload