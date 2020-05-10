import React, { useState } from 'react'
import '../scss/_model.scss'
import Button from '../components/UI/Button'
import UploadBox from '../components/UI/UploadBox'

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
    <form className="model" onSubmit={event => onUploadClicked(event)} style={{ width: 500 }}>
      <div className="top">
        <h5>CHANGE PROFILE IMAGE</h5>
        <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>
      </div>
      <div className="middle">
        <UploadBox/>
      </div>
      <div className="bottom">
        <p>Terms & Conditions</p>
        <Button submit text="Change Profile Image"/>
      </div>
    </form>
  )
}

export default ProfileImg