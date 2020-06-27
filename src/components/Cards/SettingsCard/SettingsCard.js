import React from 'react'
import Button from '../../UI/Button'
import Toggle from '../../UI/Toggle'
import { updateSettingsHandler } from '../../../shared/utility'
import PropTypes from 'prop-types'

const SettingsCard = ({ user, setUser, history }) => {

  return (
    <div className="model" style={{ width: 340, marginBottom: 20 }}>
      <div className="top">
        <h5 className="title-left">PROFILE</h5>
      </div>
      <div className="middle">
        <Button text="Change Profile Picture" redirect={"/changepp"}/>
        <Button text="Change Name"/>
        <Button text="Change Email"/>
        <Button text="Change Website"/>
        <Button text="Change Password"/>
        <Toggle text="Display Email" Default={user.settings.display_email} onClick={() => updateSettingsHandler(user, setUser, "display_email", history)}/>
        <Toggle text="Display Website" Default={user.settings.display_website} onClick={() => updateSettingsHandler(user, setUser, "display_website", history)}/>
        <Toggle text="Display Contact Me" Default={user.settings.display_contact_me} onClick={() => updateSettingsHandler(user, setUser, "display_contact_me", history)}/>
      </div>
    </div>
  )
}

SettingsCard.propTypes = {
  user: PropTypes.object.isRequired,    // User object from context.
  setUser: PropTypes.func.isRequired,   // setUser function from context.
  history: PropTypes.object.isRequired, // history object from react-router-dom.
}

export default SettingsCard