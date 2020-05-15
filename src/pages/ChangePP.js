import React, { useContext } from 'react'
import { UserContext } from '../App'
import '../scss/_model.scss'
import Button from '../components/UI/Button'
import UploadBox from '../components/UI/UploadBox'
import { updatePP } from '../shared/authRequests'

const ChangePP = ({ history }) => {
  const { user, setUser, setLoading } = useContext(UserContext)

  const onChangePPClicked = event => {
    event.preventDefault()
    updatePP(user, setUser, history, setLoading)
  }

  return (
    <form className="model" onSubmit={event => onChangePPClicked(event)} style={{ width: 500 }}>
      <div className="top">
        <h5>CHANGE PROFILE PICTURE</h5>
        <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>
      </div>
      <div className="middle">
        <UploadBox user={user} setUser={setUser}/>
      </div>
      <div className="bottom">
        <p>Terms & Conditions</p>
        <Button submit text="Change Profile Picture"/>
      </div>
    </form>
  )
}

export default ChangePP