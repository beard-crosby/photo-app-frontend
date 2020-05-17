import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import '../scss/_splash.scss'
import Create from './Create'
import Masonry from 'react-masonry-component'
import { allPosts } from '../shared/postRequests'

const Splash = () => {
  const { user, setUser } = useContext(UserContext)
  const [ masComp, setMasComp ] = useState(null)

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
      {user.posts && <Masonry 
        className={`masonry ${masComp}`}
        onLayoutComplete={() => setMasComp("masonry-complete")}>
        {user.posts.map(post => <img alt="A Random User Post" src={post.img}/>)}
      </Masonry>}
    </>
  )
}

export default Splash