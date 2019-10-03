import React from 'react'
import '../scss/following.scss'
import PhotoCard from '../components/PhotoCard'

const Following = () => 
  <div className="Following-Wrapper">
    <PhotoCard img={<img alt="Test Img" src={require('../static/testPictures/8.jpg')}/>} style={{ marginBottom: 40 }}/>
    <PhotoCard img={<img alt="Test Img" src={require('../static/testPictures/9.jpg')}/>} style={{ marginBottom: 40 }}/>
    <PhotoCard img={<img alt="Test Img" src={require('../static/testPictures/3.jpg')}/>} style={{ marginBottom: 40 }}/>
    <PhotoCard img={<img alt="Test Img" src={require('../static/testPictures/7.jpg')}/>} style={{ marginBottom: 40 }}/>
    <PhotoCard img={<img alt="Test Img" src={require('../static/testPictures/11.jpg')}/>}/>
  </div>

export default Following