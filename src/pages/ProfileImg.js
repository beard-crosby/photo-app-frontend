import React, { useState } from 'react'
import '../scss/_model.scss'
import { Upload } from 'react-feather'
import Button from '../components/UI/Button'

const ProfileImg = ({ history }) => {
  const [ form, setForm ] = useState({
    profileImg: null,
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

  return (
    <form className="model" onClick={event => onUploadClicked(event)} style={{ width: 500 }}>
      <div className="top">
        <h4>Change Profile Image</h4>
        <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>
      </div>
      <div className="upload-box" onMouseUp={() => updateField()}>
        <Upload/>
        <h1>Drag and Drop</h1>
      </div>
      <Button text="Change Profile Image"/>
    </form>
  )
}

export default ProfileImg