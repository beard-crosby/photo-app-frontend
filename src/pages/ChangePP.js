import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../App'
import '../scss/_model.scss'
import Button from '../components/UI/Button'
import UploadBox from '../components/UI/UploadBox'
import { updatePP } from '../shared/authRequests'

const ChangePP = ({ history }) => {
  const { user, setUser, setLoading } = useContext(UserContext)
  const [ formValid, setFormValid ] = useState(false)

  const onChangePPClicked = event => {
    event.preventDefault()
    updatePP(user, setUser, history, setLoading)
  }

  useEffect(() => { 
    user.file.uploaded && setFormValid(true)
  }, [user])

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
        <Button submit disabled={!formValid} text="Change Profile Picture"/>
      </div>
    </form>
  )
}

export default ChangePP