import React, { useState, useContext } from 'react'
import { UserContext } from '../App' 
import '../scss/_profile.scss'
import ProfileCard from '../components/ProfileCard'
import ProfilePicture from '../components/UI/ProfilePicture'
import Masonry from 'react-masonry-component'

const Profile = () => {
  const { user } = useContext(UserContext)
  const [ masComp, setMasComp ] = useState(null)

  return (
    <div className="flex-col">
      <div className="flex-row">
        <ProfileCard user={user}/>
      </div>
      <div className="model settings">
        <div className="top">
          <h5>FOLLOWING</h5>
          {user.following.length > 8 && <h5>SEE FULL LIST</h5>}
        </div>
        <div className="middle">
          <div className="middle-row" style={{ justifyContent: "flex-start" }}>
            {user.following.map((followed, i) => 
            <ProfilePicture key={i} user={followed} heightWidth={60} style={{ marginRight: 10 }} following/>)}
          </div>
        </div>
      </div>
      <Masonry 
        className={`masonry ${masComp}`}
        onLayoutComplete={() => setMasComp("masonry-complete")}>
        {user.posts.map(post => <img key={post._id} alt="A Random User Post" src={post.img}/>)}
      </Masonry>
    </div>
  )
}

export default Profile