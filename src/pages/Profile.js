import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import ProfileCard from '../components/Cards/ProfileCard'
import Following from '../components/Following'
import Biography from '../components/Biography'
import Masonry from 'react-masonry-component'

const Profile = () => {
  const { user } = useContext(UserContext)
  const [ masComp, setMasComp ] = useState(null)

  return (
    <div className="flex-col">
      <div className="flex-row">
        <ProfileCard user={user}/>
      </div>
      <div className="flex-row-nobg">
        <Following user={user}/>
        <Biography/>
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