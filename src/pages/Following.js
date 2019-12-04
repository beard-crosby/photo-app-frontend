import React, { useContext } from 'react'
import { UserContext } from '../App'
import PhotoCard from '../components/PhotoCard'

const Following = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      {user.following.map((followed, i) =>
        followed.uploads.map(upload => 
          <PhotoCard
            key={i}
            ident={i}
            img={<img alt="Test Img" src={require(`../static/testPictures/${upload.img}`)}/>}
            name={followed.name}
            profileImg={<img alt="Test Img" src={require(`../static/defaults/${followed.profileImg}`)}/>}
          />
        )
      )}
    </>
  )
}

export default Following