import React, { useContext } from 'react'
import { UserContext } from '../App' 
import '../scss/_profile.scss'
import { postsWidth } from '../shared/utility'
import ProfileInfo from '../components/ProfileInfo'
import ProfilePicture from '../components/UI/ProfilePicture'

const Profile = () => {
  const { user } = useContext(UserContext)

  return (
    <div className="flex-col">
      <div className="flex-row">
        <ProfileInfo user={user}/>
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