import React, { useContext } from 'react'
import { UserContext } from '../App' 
import '../scss/_profile.scss'
import { Menu } from 'react-feather'

const Profile = ({ history }) => {
  const { user } = useContext(UserContext)

  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="profile-info" style={!user.bio && { width: '100%' }}>
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
        {user.bio && <div className="bio">
          <p className="bio-title">Biography:</p>
          <div className="bio-body">
            <p>{user.bio}</p>
          </div>
        </div>}
      </div>
      <div className="posts">
        <div className="posts-bar">
          <Menu className="menu-btn"/>
          <div className="posts-bar-section" style={{ borderRight: '1px solid #EEEEEE' }}>
            <p>Search</p>
          </div>
          <div className="posts-bar-section" style={{ borderRight: '1px solid #EEEEEE' }}>
            <p>Sort Alphabetically</p>
          </div>
          <div className="posts-bar-section" style={{ borderRight: '1px solid #EEEEEE' }}>
            <p>Sort By Date</p>
          </div>
          <div className="posts-bar-section">
            <p>Random</p>
          </div>
        </div>
        {user.posts.length === 0 ? 
        <div className="posts-content" style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <h2>You have no Posts!</h2>
        </div> : 
        <div className="posts-content">
          {user.posts.map((Post, i) =>
            <div key={i} className="img-wrapper">
              <img alt="Test Img" src={require(`../static/testPictures/${Post.img}.jpg`)}/>
            </div>
          )}
        </div>}
      </div>
    </div>
  )
}

export default Profile