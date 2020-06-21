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
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    values: {
      website: "",
    },
    errors: {
      websiteError: "",
    },
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
    !user.file.url && checkFormValid(form, setFormValid)
    user.file.url && user.file.url.includes("profile-picture") && setFormValid(true)
  }, [user, setUser, form])

  const onDoneClicked = e => {
    e.preventDefault()
    user.file.url && user.file.url.includes("profile-picture") && updatePP(user, setUser, wall, setWall, history, setLoading)
    form.values.website && updateBasic(form.values, user, setUser, history)
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
          <FormSection text={"Add a Website"} err={form.errors.websiteError} user={user} form={form} setForm={setForm}/>
          <Button text="Done" submit disabled={!formValid} onClick={e => onDoneClicked(e)}/>
        </div>
      </form>
      <Link className="below" to="/"><h6>Skip</h6></Link>
    </>
  )
}

export default SignedUp