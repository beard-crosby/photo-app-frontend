import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import '../scss/_splash.scss'
import Create from './Create'
import { allPosts } from '../shared/postRequests'
import Masonry from '../components/Masonry'

const Splash = () => {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => allPosts(user, setUser), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex-col">
      <div className="app-and-create">
        <div className="app">
          <img alt="iPhone 11" src={require("../static/misc/iphone-template.png")}/>
        </div>
        <Create/>
      </div>
      {user.allPosts && <Masonry array={user.allPosts}/>}
    </div>
  )
}

export default Splash