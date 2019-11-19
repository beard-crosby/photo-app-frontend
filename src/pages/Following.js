import React from 'react'
import '../scss/_following.scss'
import PhotoCard from '../components/PhotoCard'
import testData from '../testData'

const Following = () =>
  <div className="following-wrapper">
    {testData.map((testData, i) => 
      <PhotoCard
        key={i}
        ident={i}
        img={<img alt="Test Img" src={require(`../static/testPictures/${testData.img}`)}/>}
        name={testData.name}
        profileImg={<img alt="Test Img" src={require(`../static/defaults/${testData.profileImg}`)}/>}
      />)}
  </div>

export default Following