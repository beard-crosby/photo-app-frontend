import React, { useContext } from 'react'
import { UserContext } from '../App'
import PhotoCard from '../components/PhotoCard'

const Following = () => {
  const { user } = useContext(UserContext)
  let ident = -1 // Start at -1 so that the first element will be 0 when ident++.

  return (
    <>
      {user.following.map(followed => // Loop through all the users that the user is following.
        followed.uploads.map(upload => { // Loop through all the uploads each user has.
          ident++
          return (
            <PhotoCard
              key={ident}
              ident={ident}
              img={<img alt="Test Img" src={require(`../static/testPictures/${upload.img}`)}/>}
              name={followed.name}
              profileImg={<img alt="Test Img" src={require(`../static/defaults/${followed.profileImg}`)}/>}
            />
          )
        })
      )}
    </>
  )
}

export default Following