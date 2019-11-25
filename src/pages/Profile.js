import React, { useState } from 'react'
import '../scss/_profile.scss'
import { Uploads } from '../testData'
import { Clock, Grid, HelpCircle, Search } from 'react-feather'

const Profile = () => 
  <div className="profile-wrapper">
    <div className="profile">
      <div className="profile-info">
        <div className="profile-picture"/>
        <div className="info">
          <h2>Maximilian Crosby</h2>
          <div className="username-email">
            <p>Maxiscoolerthansam6969</p>
            <p>www.samissupergay.com</p>
          </div>
        </div>
      </div>
      <div className="bio">
        <p>Biography:</p>
        <div className="bio-body">
        <p>The longest bio ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and</p>
        </div>
      </div>
    </div>
    <div className="uploads">
      <div className="uploads-bar">
        <div className="uploads-bar-section" style={{ borderRight: '1px solid #EEEEEE' }}>
          <p>Search</p>
          <Search/>
        </div>
        <div className="uploads-bar-section" style={{ borderRight: '1px solid #EEEEEE' }}>
          <p>Sort Alphabetically</p>
          <HelpCircle/>
        </div>
        <div className="uploads-bar-section" style={{ borderRight: '1px solid #EEEEEE' }}>
          <p>Sort By Date</p>
          <Clock/>
        </div>
        <div className="uploads-bar-section">
          <p>Random</p>
          <Grid/>
        </div>
      </div>
      {Uploads.length === 0 ? 
      <div className="uploads-content" style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        <h2>You have no uploads!</h2>
      </div> : 
      <div className="uploads-content">
        {Uploads.map((Upload, i) =>
          <div key={i} className="img-wrapper">
            <img alt="Test Img" src={require(`../static/testPictures/${Upload.img}.jpg`)}/>
          </div>
        )}
      </div>}
    </div>
  </div>

export default Profile