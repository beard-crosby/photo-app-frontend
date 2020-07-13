import React, { useContext, useEffect } from 'react'
import { Context } from '../App'
import AuthCard from '../components/Cards/AuthCard'
import { posts } from '../shared/postRequests'
import Masonry from '../components/Masonry'

const Auth = ({ history }) => {
  const { user, setUser, setLoading } = useContext(Context)
  useEffect(() => posts(user, setUser, 20, 1), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex-col">
      <AuthCard user={user} setUser={setUser} setLoading={setLoading} history={history} style={{ width: 400, marginBottom: 20 }}/>
      {user.posts && <Masonry array={user.posts[0]} noInteract/>}
    </div>
  )
}

export default Auth