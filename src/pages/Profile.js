import React, { useContext } from 'react'
import { UserContext } from '../App'
import ProfileCard from '../components/Cards/ProfileCard'
import PhotoCard from '../components/Cards/PhotoCard'
import Following from '../components/Following'
import UserInfo from '../components/UserInfo'
import FavouritesCard from '../components/Cards/FavouritesCard'
import Masonry from '../components/Masonry'

const Profile = ({ history }) => {
  const { user, setUser } = useContext(UserContext)

  return (
    <div className="flex-col">
      <div className="flex-row">
        <ProfileCard user={user}/>
      </div>
      <div className="flex-row">
        <Following user={user}/>
        <div className="profile-col" id="profile-col">
          <UserInfo user={user} setUser={setUser}/>
          <FavouritesCard user={user} setUser={setUser}/>
        </div>
      </div>
      {user.postClicked ? 
      <PhotoCard user={user} setUser={setUser} post={user.postClicked} history={history}/> : 
      <Masonry array={user.posts} user={user} setUser={setUser}/>}
    </div>
  )
}

export default Profile