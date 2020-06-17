import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import Create from './Create'
import { allPosts } from '../shared/postRequests'
import Masonry from '../components/Masonry'

const Splash = () => {
  const { user, setUser } = useContext(UserContext)
  useEffect(() => allPosts(user, setUser), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex-col">
      <Create/>
      {user.allPosts && <Masonry array={user.allPosts} noInteract/>}
    </div>
  )
}

export default Splash