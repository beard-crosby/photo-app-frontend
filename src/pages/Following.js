import React from 'react'
import '../scss/following.scss'
import PhotoCard from '../components/PhotoCard'
import testData from '../TestData'

const Following = () =>
  <div className="Following-Wrapper">
    {testData.map((testData, i) => 
      <PhotoCard
        key={i}
        ident={i}
        img={<img alt="Test Img" src={require(`../static/testPictures/${testData.img}`)}/>}
        name={testData.name}
        profileImg={<img alt="Test Img" src={require(`../static/defaults/${testData.profileImg}`)}/>}
        style={{ marginBottom: 40 }}/>)}
  </div>

export default Following