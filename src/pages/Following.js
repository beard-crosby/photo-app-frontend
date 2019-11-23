import React from 'react'
import PhotoCard from '../components/PhotoCard'
import { Photocards } from '../testData'

const Following = () =>
  <>
    {Photocards.map((Photocards, i) => 
      <PhotoCard
        key={i}
        ident={i}
        img={<img alt="Test Img" src={require(`../static/testPictures/${Photocards.img}`)}/>}
        name={Photocards.name}
        profileImg={<img alt="Test Img" src={require(`../static/defaults/${Photocards.profileImg}`)}/>}
      />)}
  </>

export default Following