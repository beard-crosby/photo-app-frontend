import React, { useContext, useState } from 'react'
import { UserContext } from '../App' 
import '../scss/_profile.scss'
import { Menu } from 'react-feather'

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
      <div className="posts" style={user.posts.length === 0 && { justifyContent: "center", alignItems: "center" }}>
        {user.posts.length === 0 ? <h2>You have no Posts!</h2> :
          user.posts.map((Post, i) =>
            <div key={i} className="img-wrapper">
              <img alt="Test Img" src={require(`../static/testPictures/${Post.img}.jpg`)}/>
            </div>
          )}
      </div>
    </div>
  )
}

export default Profile