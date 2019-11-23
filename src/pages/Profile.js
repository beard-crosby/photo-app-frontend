import React from 'react'
import '../scss/_profile.scss'
import { Uploads } from '../testData'

const Profile = () => 
  <>
    <div className="profile">
      <div className="profile-info">
        <div className="profile-picture"/>
        <div className="info">
          <h2>Maximilian Crosby</h2>
          <div className="username-email">
            <p>Maxiscoolerthansam92</p>
            <p>www.samissuperdupergay.com</p>
          </div>
        </div>
      </div>
      <div className="bio">
        <p>Biography:</p>
        <div className="bio-body">
         <p>The longest bio ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and</p>
        </div>
      </div>
    </div>
<div className="uploads">
  <div className="uploads-bar">
    <div className="uploads-bar-section" style={{ borderRight: '1px solid #EEEEEE' }}>
      <p>Sort Alphabetically</p>
    </div>
    <div className="uploads-bar-section" style={{ borderRight: '1px solid #EEEEEE' }}>
      <p>Sort By Date</p>
    </div>
    <div className="uploads-bar-section" style={{ borderRight: '1px solid #EEEEEE' }}>
    
    </div>
    <div className="uploads-bar-section">
    
    </div>
  </div>
  <div className="uploads-content">
    {Uploads.map((Upload, i) =>
      <div className="img-container">
        <img 
          key={i} 
          alt="Test Img" 
          src={require(`../static/testPictures/${i}.jpg`)}/>
      </div>
    )}
  </div>
</div>
  </>

export default Profile