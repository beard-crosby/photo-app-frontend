import React, { useContext } from 'react'
import { UserContext } from '../App' 
import '../scss/_profile.scss'
import { postsWidth } from '../shared/utility'

const Profile = ({ history }) => {
  const { user } = useContext(UserContext)

  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="profile-col">
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
        </div>
        <textarea placeholder="Write a biography" maxLength="180"/>
      </div>
      <div className={`posts ${user.posts.length === 0 && `no-posts`}`} style={{ width: postsWidth(user.posts) }}>
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