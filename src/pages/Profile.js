import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App' 
import '../scss/_profile.scss'
import { postsWidth, sendInputReqHandler } from '../shared/utility'
import ProfilePicture from '../components/UI/ProfilePicture'

const Profile = () => {
  const { user, setUser } = useContext(UserContext)

  const updateField = e => {
    setUser({ 
      ...user, 
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => sendInputReqHandler(user, setUser, 'bio-textarea'),[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="profile-col">
          <ProfilePicture user={user} style={{ margin: "0 20px 0 10px" }}/>
          <div className="info">
            <h2>{user.name}</h2>
            <div className="username-email">
              <p>{user.email}</p>
              {user.website && <p>{user.website}</p>}
            </div>
          </div>
        </div>
        <textarea 
          type="text"
          name="bio"
          id="bio-textarea"
          placeholder="Write a biography" 
          maxLength="180"
          onChange={updateField}
          value={user.bio}/>
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