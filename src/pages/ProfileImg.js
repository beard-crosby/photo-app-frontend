import React, { useContext } from 'react'
import { UserContext } from '../App'
import '../scss/_model.scss'
import Button from '../components/UI/Button'
import UploadBox from '../components/UI/UploadBox'

const ProfileImg = ({ history }) => {
  const { user, setUser } = useContext(UserContext)

  const onUploadClicked = event => {
    event.preventDefault()
    // request
  }

  return (
    <div className="model" onSubmit={event => onUploadClicked(event)} style={{ width: 500 }}>
      <div className="top">
        <h5>CHANGE PROFILE IMAGE</h5>
        <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>
      </div>
      <div className="middle">
        <UploadBox user={user} setUser={setUser}/>
      </div>
      <div className="bottom">
        <p>Terms & Conditions</p>
        <Button submit text="Change Profile Image"/>
      </div>
    </div>
  )
}

export default ProfileImg