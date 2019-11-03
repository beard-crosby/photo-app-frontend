import React from 'react'
import '../scss/_profile.scss'

const Profile = () => 
  <>
    <div className="profile-info">
      <div className="info-wrapper">
        <div className="profile-picture"/>
        <div className="basic-info">
          <h1>Maximilian Crosby</h1>
          <div className="user-contact">
            <p>Maxiscoolerthansam92</p>
            <p>www.samissuperdupergay.com</p>
          </div>
        </div>
      </div>
    </div>
    <div className="content-row">
      <div className="content-column">
        <img alt="Test Img" src={require('../static/testPictures/1.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/2.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/3.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/4.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/5.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/6.jpg')}/>
      </div>
      <div className="content-column hide-mobile">
        <img alt="Test Img" src={require('../static/testPictures/7.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/8.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/9.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/10.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/11.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/12.png')}/>
      </div>
    </div>
  </>

export default Profile