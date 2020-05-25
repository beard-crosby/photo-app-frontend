import React, { useContext } from 'react'
import { UserContext } from '../App'
import ProfileCard from '../components/Cards/ProfileCard'
import Following from '../components/Following'
import UserInfo from '../components/UserInfo'
import FavouritesCard from '../components/Cards/FavouritesCard'
import Masonry from '../components/Masonry'

const Profile = () => {
  const { user, setUser } = useContext(UserContext)

  return (
    <div className="flex-col">
      <div className="flex-row">
        <ProfileCard user={user}/>
      </div>
      <div className="flex-row">
        <Following user={user}/>
        <div className="profile-col">
          <UserInfo user={user} setUser={setUser}/>
          {!user.aboutFocused && <FavouritesCard user={user}/>}
        </div>
      </div>
      <Masonry array={user.posts}/>
    </div>
  )
}

export default Profile