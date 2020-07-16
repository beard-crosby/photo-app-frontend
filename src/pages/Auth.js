import React, { useContext, useEffect } from 'react'
import { Context } from '../App'
import AuthCard from '../components/Cards/AuthCard'
import { posts } from '../shared/postRequests'
import MasonryWrapper from '../components/Masonry/MasonryWrapper'

const Auth = ({ history }) => {
  const { user, setUser, setLoading } = useContext(Context)
  useEffect(() => posts(user, setUser, 20, 4), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MasonryWrapper user={user}>
      <AuthCard user={user} setUser={setUser} setLoading={setLoading} history={history} style={{ marginBottom: 7, width: 343 }}/>
    </MasonryWrapper>
  )
}

export default Auth