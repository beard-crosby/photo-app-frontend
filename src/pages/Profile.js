import React, { useContext, useState } from 'react'
import { UserContext } from '../App' 
import '../scss/_profile.scss'

const Profile = ({ history }) => {
  const { user } = useContext(UserContext)
  const [ bioClicked, setBioClicked ] = useState(false)

  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="profile-info" style={!user.bio && { width: '100%', padding: 0 }}>
          <div className="profile-picture" onClick={() => history.push("/profileimg")}>
            <h2>Change</h2>
          </div>
          <div className="info">
            <h2>{user.name}</h2>
            <div className="username-email">
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
          </div>
          {!user.bio && <div className="write-bio">
            <p onClick={() => setBioClicked(true)}>Write a Biography</p>
          </div>}
        </div>
        {user.bio && <div className="bio">
          <p className="bio-title">Biography:</p>
          <div className="bio-body">
            <p>{user.bio}</p>
          </div>
        </div>}
      </div>
      <div className={`posts ${user.posts.length === 0 && `no-posts`}`}>
        {user.posts.length === 0 ? <h2>You have no Posts!</h2> :
          user.posts.map(post => 
            <div key={post.img} className="img-wrapper">
              <img alt="post" src={post.img}/>
            </div>
          )}
      </div>
    </div>
  )
}

export default Profile