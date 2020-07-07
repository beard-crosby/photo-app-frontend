import React, { useContext, useState } from 'react'
import { Context } from '../App'
import ProfileCard from '../components/Cards/ProfileCard'
import PhotoCard from '../components/Cards/PhotoCard'
import FollowingCard from '../components/Cards/FollowingCard'
import InfoCard from '../components/Cards/InfoCard'
import FavouritesCard from '../components/Cards/FavouritesCard'
import Masonry from '../components/Masonry'

const Profile = () => {
  const { user, setUser, wall, setWall } = useContext(Context)
  const [ postClicked, setPostClicked ] = useState(null)

  return (
    <div className="flex-col">
      <div className="flex-row">
        <ProfileCard user={user}/>
      </div>
      <div className="flex-row">
        <FollowingCard user={user}/>
        <div className="profile-col" id="profile-col">
          <InfoCard user={user} setUser={setUser}/>
          <FavouritesCard user={user} postClicked={postClicked} setPostClicked={setPostClicked}/>
        </div>
      </div>
      {postClicked && <PhotoCard user={user} setUser={setUser} wall={wall} setWall={setWall} post={postClicked} setPostClicked={setPostClicked}/>} 
      <Masonry array={user.posts} postClicked={postClicked} setPostClicked={setPostClicked}/>
    </div>
  )
}

export default Profile