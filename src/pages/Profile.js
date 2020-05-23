import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import ProfileCard from '../components/Cards/ProfileCard'
import Following from '../components/Following'
import UserInfo from '../components/UserInfo'
import Masonry from 'react-masonry-component'
import FavouritesCard from '../components/Cards/FavouritesCard'

const Profile = () => {
  const { user, setUser } = useContext(UserContext)
  const [ masComp, setMasComp ] = useState(null)

  return (
    <div className="flex-col">
      <div className="flex-row">
        <ProfileCard user={user}/>
      </div>
      <div className="flex-row">
        <Following user={user}/>
        <div className="flex-col" style={{ height: 360, justifyContent: "space-between" }}>
          <UserInfo user={user} setUser={setUser}/>
          {!user.aboutFocused && <FavouritesCard/>}
        </div>
      </div>
      <Masonry 
        className={`masonry ${masComp}`}
        onLayoutComplete={() => setMasComp("masonry-complete")}>
        {user.posts.map(post => <img key={post._id} alt="One of your posts" src={post.img}/>)}
      </Masonry>
    </div>
  )
}

export default Profile