import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import ProfileCard from '../components/Cards/ProfileCard'
import Following from '../components/Following'
import UserInfo from '../components/UserInfo'
import Masonry from 'react-masonry-component'
import ContactCard from '../components/Cards/ContactCard'

const Profile = () => {
  const { user } = useContext(UserContext)
  const [ masComp, setMasComp ] = useState(null)

  return (
    <div className="flex-col">
      <div className="flex-row section">
        <ProfileCard user={user}/>
      </div>
      <div className="flex-row">
        <Following user={user}/>
        <div className="flex-col">
          <UserInfo/>
          <ContactCard/>
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