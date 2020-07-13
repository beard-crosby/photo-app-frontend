import React, { useContext, useEffect } from 'react'
import { Context } from '../App'
import { posts } from '../shared/postRequests'
import CreateCard from '../components/Cards/CreateCard'
import Masonry from '../components/Masonry'

const Splash = ({ history }) => {
  const { user, setUser, setLoading } = useContext(Context)
  useEffect(() => posts(user, setUser, 20, 1), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex-col">
      <CreateCard user={user} setUser={setUser} setLoading={setLoading} history={history} style={{ marginBottom: 20 }}/>
      {user.posts && <Masonry array={user.posts[0]} noInteract/>}
    </div>
  )
}

export default Splash