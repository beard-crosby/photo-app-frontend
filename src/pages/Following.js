import React from 'react'
import '../scss/following.scss'
import PhotoCard from '../components/PhotoCard'
import testData from '../testData'

const Following = () => 
  <div className="Following-Wrapper">
    {testData.map((testData, i) => 
      <PhotoCard
        key={i}
        ident={i}
        img={<img alt="Test Img" src={require(`../static/testPictures/${testData.img}`)}/>}
        name={testData.name}
        profileImg={<img alt="Test Img" src={require(`../static/defaults/${testData.profileImg}`)}/>}
        style={window.matchMedia("(min-width: 600px)").matches ? { marginBottom: 40 } : { marginBottom: 20 }}/>)}
  </div>

export default Following