import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../App'
import { Link } from 'react-router-dom'
import '../scss/_model.scss'
import Button from '../components/UI/Button'
import UploadBox from '../components/UI/UploadBox'
import { updatePP } from '../shared/authRequests'
import { Upload } from 'react-feather'

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
    <>
      <form className="model" onSubmit={event => onChangePPClicked(event)} style={{ width: 450 }}>
        <div className="top">
          <h5 className="title">CHANGE PROFILE PICTURE</h5>
          <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>
        </div>
        <div className="middle">
          <UploadBox user={user} setUser={setUser}/>
          <Button submit disabled={!formValid} icon={<Upload/>} text="Change Profile Picture"/>
        </div>
      </form>
      <Link className="below" to="/termsandconditions"><h6>Terms and Conditions</h6></Link>
    </>
  )
}

export default ChangePP