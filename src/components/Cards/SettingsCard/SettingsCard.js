import React, { useState, useEffect } from 'react'
import Button from '../../UI/Button'
import Toggle from '../../UI/Toggle'
import { updateSettingsHandler } from '../../../shared/utility'
import { updateBasic, findUser } from '../../../shared/authRequests'
import { checkFormValid } from '../../../shared/formValidation'
import FormSection from '../../UI/FormSection'
import PropTypes from 'prop-types'

const SettingsCard = ({ user, setUser, history }) => {
  const [ tab, setTab ] = useState("")
  const [ formErrors, setFormErrors ] = useState("")
  const [ formValid, setFormValid ] = useState(false)

  const formDefault = {
    name: user.name,
    email: user.email,
    website: user.website,
  }

  const [ form, setForm ] = useState(formDefault)

  useEffect(() => {
    tab && checkFormValid(user, {[tab]: form[tab]}, formErrors, setFormValid)
  }, [tab, user, form, formErrors])
  
  useEffect(() => {
    if (tab === "email" && user.email === "") {
      findUser(user._id, user, setUser, history)
    } else if (tab === "website" && user.website === "") {
      findUser(user._id, user, setUser, history)
    }
  }, [tab, user, setUser, history])

  useEffect(() => {
    return () => {
      if (!user.settings.display_email && user.email.length !== 0 && !user.settings.display_website && user.website.length !== 0) {
        setUser({...user, email: "", website: ""})
      } else if (!user.settings.display_email && user.email.length !== 0) {
        setUser({...user, email: ""})
      } else if (!user.settings.display_website && user.website.length !== 0) {
        setUser({...user, website: ""})
      }
    }
  }, [user])

  const onSubmitHandler = e => {
    e.preventDefault()
    updateBasic({[tab]: form[tab]}, user, setUser, history)
    setFormValid(false)
    setForm(formDefault)
    setTab("")
  }

  return (
    <div className="model" style={{ width: 340, marginBottom: 20 }}>
      <div className="top">
        <h5 className={`${!tab && `title-left`}`}>PROFILE</h5>
        {tab && <h5 className="back" onClick={() => setTab("")}>BACK</h5>}
      </div>
      {tab === "name" &&
      <form onSubmit={e => onSubmitHandler(e)}>
        <FormSection label={"Name"} form={form} setForm={setForm} setFormErrors={setFormErrors} defaultValue={user.name}/>
        <Button text="Change Name" submit disabled={!formValid}/>
      </form>
      }
      {tab === "email" &&
      <form onSubmit={e => onSubmitHandler(e)}>
        <FormSection label={"Email"} form={form} setForm={setForm} setFormErrors={setFormErrors} defaultValue={user.email}/>
        <Button text="Change Email" submit disabled={!formValid}/>
      </form>
      }
      {tab === "website" &&
      <form onSubmit={e => onSubmitHandler(e)}>
        <FormSection label={"Website"} form={form} setForm={setForm} setFormErrors={setFormErrors} defaultValue={user.website}/>
        <Button text="Change Website" submit disabled={!formValid}/>
      </form>
      }
      {!tab && 
      <div className="middle">
        <Button text="Change Profile Picture" redirect={"/changepp"}/>
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
  history: PropTypes.object.isRequired, // history object from react-router-dom.
}

export default SettingsCard