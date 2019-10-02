import React from 'react'
import '../scss/profile.scss'

const Profile = () => 
  <>
    <div className="ProfileInfo">
      <div className="InfoWrapper">
        <div className="ProfilePicture"/>
        <div className="BasicInfo">
          <h1>Maximilian Crosby</h1>
          <div className="User-Contact">
            <p>Maxiscoolerthansam92</p>
            <p>www.samissuperdupergay.com</p>
          </div>
        </div>
      </div>
    </div>
    <div className="ContentRow">
      <div className="ContentColumn">
        <img alt="Test Img" src={require('../static/testPictures/1.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/2.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/3.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/4.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/5.jpg')}/>
        <img alt="Test Img" src={require('../static/testPictures/6.jpg')}/>
      </div>
      <div className="ContentColumn Hide-Mobile">
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