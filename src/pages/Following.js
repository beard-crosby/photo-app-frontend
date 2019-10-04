import React from 'react'
import '../scss/following.scss'
import PhotoCard from '../components/PhotoCard'

const Following = () => 
  <div className="Following-Wrapper">
    <PhotoCard 
      img={<img alt="Test Img" src={require('../static/testPictures/8.jpg')}/>}
      name="Maximilian Crosby"
      username="Samissupergay69"
      profileImg={<img alt="Test Img" src={require('../static/defaults/placeholder.png')}/>}
      style={{ marginBottom: 40 }}/>
    <PhotoCard 
      img={<img alt="Test Img" src={require('../static/testPictures/9.jpg')}/>} 
      name="Samuel Beard"
      username="TestyMctesttest92"
      profileImg={<img alt="Test Img" src={require('../static/defaults/placeholder.png')}/>}
      style={{ marginBottom: 40 }}/>
    <PhotoCard 
      img={<img alt="Test Img" src={require('../static/testPictures/3.jpg')}/>} 
      name="I feel the need"
      username="The_need_for_speed23"
      profileImg={<img alt="Test Img" src={require('../static/defaults/placeholder.png')}/>}
      style={{ marginBottom: 40 }}/>
    <PhotoCard 
      img={<img alt="Test Img" src={require('../static/testPictures/7.jpg')}/>} 
      name="Stupidly Long and Convoluted Name"
      username="If_You_wAnT_tO_Live"
      profileImg={<img alt="Test Img" src={require('../static/defaults/placeholder.png')}/>}
      style={{ marginBottom: 40 }}/>
    <PhotoCard 
      img={<img alt="Test Img" src={require('../static/testPictures/11.jpg')}/>}
      name="Im Gonna Get Them"
      username="If_Its_The_Last_Thing_I_do"
      profileImg={<img alt="Test Img" src={require('../static/defaults/placeholder.png')}/>}/>
  </div>

export default Following