import React, { useContext } from 'react'
import { UserContext } from '../App' 
import '../scss/_profile.scss'
import { Clock, Grid, HelpCircle, Search, Menu } from 'react-feather'

const Profile = () => {
  const { user } = useContext(UserContext)

  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="profile-info">
          <div className="profile-picture"/>
          <div className="info">
            <h2>{user.name}</h2>
            <div className="username-email">
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        <div className="bio">
          <p className="bio-title">Biography:</p>
          <div className="bio-body">
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
      <div className="uploads">
        <div className="uploads-bar">
          <Menu className="menu-btn"/>
          <div className="uploads-bar-section" style={{ borderRight: '1px solid #EEEEEE' }}>
            <p>Search</p>
          </div>
          <div className="uploads-bar-section" style={{ borderRight: '1px solid #EEEEEE' }}>
            <p>Sort Alphabetically</p>
          </div>
          <div className="uploads-bar-section" style={{ borderRight: '1px solid #EEEEEE' }}>
            <p>Sort By Date</p>
          </div>
          <div className="uploads-bar-section">
            <p>Random</p>
          </div>
        </div>
        {user.uploads.length === 0 ? 
        <div className="uploads-content" style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <h2>You have no uploads!</h2>
        </div> : 
        <div className="uploads-content">
          {user.uploads.map((Upload, i) =>
            <div key={i} className="img-wrapper">
              <img alt="Test Img" src={require(`../static/testPictures/${Upload.img}.jpg`)}/>
            </div>
          )}
        </div>}
      </div>
    </div>
  )
}

export default Profile