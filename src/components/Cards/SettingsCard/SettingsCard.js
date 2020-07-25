import React, { useState, useEffect } from 'react'
import Button from '../../UI/Button'
import Toggle from '../../UI/Toggle'
import { updateSettingsHandler, removeKey } from '../../../shared/utility'
import { updateBasic, findUser, updatePP } from '../../../shared/authRequests'
import { checkFormValid } from '../../../shared/formValidation'
import FormSection from '../../UI/FormSection'
import UploadBox from '../../UI/UploadBox'
import { Upload } from 'react-feather'
import Spinner from '../../Spinner'
import PropTypes from 'prop-types'

const SettingsCard = ({ user, setUser, wall, setWall, history }) => {
  const [ tab, setTab ] = useState("")
  const [ formErrors, setFormErrors ] = useState("")
  const [ formValid, setFormValid ] = useState(false)
  const [ spinner, setSpinner ] = useState(false)

  const formDefault = {
    name: user.name,
    email: user.email,
    website: user.website,
  }

  const [ form, setForm ] = useState(formDefault)

  useEffect(() => {
    if (user.changePP) {
      setTab("changepp")
      setUser(removeKey(user, "changePP"))
    }

    tab && tab !== "changepp" && checkFormValid(user, {[tab]: form[tab]}, formErrors, setFormValid)
  }, [tab, user, setUser, form, formErrors])
  
  useEffect(() => {
    if (tab === "email" && user.email === "") {
      findUser(user._id, user, setUser, history)
    } else if (tab === "website" && user.website === "") {
      findUser(user._id, user, setUser, history)
    }
  }, [tab, user, setUser, history])

  useEffect(() => {
    user.file.uploaded && setFormValid(true)

    return () => {
      if (!user.settings.display_email && user.email.length !== 0 && !user.settings.display_website && user.website.length !== 0) {
        setUser({...user, email: "", website: ""})
      } else if (!user.settings.display_email && user.email.length !== 0) {
        setUser({...user, email: ""})
      } else if (!user.settings.display_website && user.website.length !== 0) {
        setUser({...user, website: ""})
      }
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmitHandler = e => {
    e.preventDefault()

    if (tab === "changepp") {
      updatePP(user, setUser, wall, setWall, history, setSpinner)
    } else {
      updateBasic({[tab]: form[tab]}, user, setUser, history)
    }

    setFormValid(false)
    setForm(formDefault)
    setTab("")
  }

  return (
    <div className="model" style={{ width: 340, marginBottom: 20, position: "relative" }}>
      <div className="top" style={{ zIndex: 9999 }}>
        <h5 className={`${!tab && `title-left`}`}>PROFILE</h5>
        {tab && <h5 className="back" onClick={() => setTab("")}>BACK</h5>}
      </div>
      {spinner && <Spinner user={user} whiteBG/>}
      {tab === "changepp" &&
      <form onSubmit={e => onSubmitHandler(e)}>
        <UploadBox user={user} setUser={setUser}/>
        <Button text="Change Profile Picture" submit disabled={!formValid} icon={<Upload/>}/>
      </form>}
      {tab === "name" &&
      <form onSubmit={e => onSubmitHandler(e)}>
        <FormSection label={"Name"} form={form} setForm={setForm} setFormErrors={setFormErrors} defaultValue={user.name}/>
        <Button text="Change Name" submit disabled={!formValid}/>
      </form>}
      {tab === "email" &&
      <form onSubmit={e => onSubmitHandler(e)}>
        <FormSection label={"Email"} form={form} setForm={setForm} setFormErrors={setFormErrors} defaultValue={user.email}/>
        <Button text="Change Email" submit disabled={!formValid}/>
      </form>}
      {tab === "website" &&
      <form onSubmit={e => onSubmitHandler(e)}>
        <FormSection label={"Website"} form={form} setForm={setForm} setFormErrors={setFormErrors} defaultValue={user.website}/>
        <Button text="Change Website" submit disabled={!formValid}/>
      </form>}
      {!tab && 
      <div className="middle">
        <Button text="Change Profile Picture" onClick={() => setTab("changepp")}/>
        <Button text="Change Name" onClick={() => setTab("name")}/>
        <Button text="Change Email" onClick={() => setTab("email")}/>
        <Button text="Change Website" onClick={() => setTab("website")}/>
        <Button text="Change Password" onClick={() => setTab("password")}/>
        <Toggle text="Display Email" Default={user.settings.display_email} onClick={() => updateSettingsHandler(user, setUser, "display_email", history)}/>
        <Toggle text="Display Website" Default={user.settings.display_website} onClick={() => updateSettingsHandler(user, setUser, "display_website", history)}/>
        <Toggle text="Display Contact Me" Default={user.settings.display_contact_me} onClick={() => updateSettingsHandler(user, setUser, "display_contact_me", history)}/>
      </div>}
    </div>
  )
}

SettingsCard.propTypes = {
  user: PropTypes.object.isRequired,    // User object from context.
  setUser: PropTypes.func.isRequired,   // setUser function from context.
  wall: PropTypes.array.isRequired,     // wall Array from context.
  setWall: PropTypes.func.isRequired,   // setWall function from context.
  history: PropTypes.object.isRequired, // history object from react-router-dom.
}

export default SettingsCard