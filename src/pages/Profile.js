import React from 'react'
import '../scss/profile.scss'
import { MdPerson } from 'react-icons/md'

const Profile = () => 
  <>
    <div className="Banner"/>
    <div className="DisplayPhoto">
      <MdPerson/>
    </div>
    <h1>Name / Username</h1>
  </>

export default Profile