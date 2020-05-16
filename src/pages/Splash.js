import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import '../scss/_splash.scss'
import Create from './Create'
import PhotoCollage from '../components/PhotoCollage'
import { allPosts } from '../shared/postRequests'

const Splash = () => {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => allPosts(user, setUser), [])

  return (
    <>
      <div className="app-and-signup">
        <div className="app">
          <img alt="iPhone 11" src={require("../static/misc/iphone-template.png")}/>
        </div>
        <div className="signup">
          <Create 
          style={{ width: '100%' }}
          stackButtons
          hideTopRight
          hideBottom/>
        </div>
      </div>
      {user.posts && <PhotoCollage author={user}/>}
    </>
  )
}

export default Splash