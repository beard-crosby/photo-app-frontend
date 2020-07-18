import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../App'
import { Link } from 'react-router-dom'
import UploadBox from '../components/UI/UploadBox'
import Button from '../components/UI/Button'
import { checkFormValid } from '../shared/formValidation'
import { removeKey } from '../shared/utility'
import FormSection from '../components/UI/FormSection'
import { updatePP, updateBasic } from '../shared/authRequests'

const SignedUp = ({ history }) => {
  const { user, setUser, wall, setWall, setLoading } = useContext(Context)
  const [ formErrors, setFormErrors ] = useState("")
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    website: "",
  })

  useEffect(() => {
    return () => {
      if (user.formErrors && user.file.url) {
        setUser({...removeKey(user, "formErrors"), file: { uploaded: false }})
      } else if (user.formErrors) {
        setUser(removeKey(user, "formErrors"))
      } else if (user.file.url) {
        setUser({...user, file: { uploaded: false }})
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user.file.url) {
      user.file.url.includes("profile-picture") && setFormValid(true)
    } else {
      checkFormValid(user, form, formErrors, setFormValid)
    }
  }, [user, setUser, form, formErrors])

  const onDoneClicked = e => {
    e.preventDefault()
    user.file.url && user.file.url.includes("profile-picture") && updatePP(user, setUser, wall, setWall, history, setLoading)
    form.website && updateBasic(form, user, setUser, history)
  }

  return (
    <>
      <form className="model">
        <div className="top">
          <h5>PERSONALISE YOUR PROFILE</h5>
        </div>
        <div className="middle center">
          <label><h5>Add a Profile Picture</h5></label>
          <UploadBox user={user} setUser={setUser} style={{ marginBottom: 20 }}/>
          <FormSection label={"Add a Website"} form={form} setForm={setForm} setFormErrors={setFormErrors}/>
          <Button text="Done" submit disabled={!formValid} onClick={e => onDoneClicked(e)}/>
        </div>
      </form>
      <Link className="below" to="/"><h6>Skip</h6></Link>
    </>
  )
}

export default SignedUp