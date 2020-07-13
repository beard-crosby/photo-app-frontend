import React, { useContext, useEffect } from 'react'
import { Context } from '../App'
import { posts } from '../shared/postRequests'
import CreateCard from '../components/Cards/CreateCard'
import Masonry from '../components/Masonry'

const Splash = ({ history }) => {
  const { user, setUser, setLoading } = useContext(Context)
  useEffect(() => posts(user, setUser, 20, 4), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {user.posts && <Masonry array={user.posts[0]} style={{ width: "25%", marginRight: 3.5 }} cols={1} noInteract/>}
      <div className="flex-col" style={{ width: "50%", margin: "0 3.5px" }}>
        <div className="splash-top-mid">
          {user.posts && <Masonry array={user.posts[1]} cols={2} noInteract originTop/>}
        </div>
        <CreateCard user={user} setUser={setUser} setLoading={setLoading} history={history} style={{ marginBottom: 7, width: 343 }}/>
        {user.posts && <Masonry array={user.posts[2]} cols={2} noInteract/>}
      </div>
      {user.posts && <Masonry array={user.posts[3]} style={{ width: "25%", marginLeft: 3.5 }} cols={1} noInteract/>}
    </>
  )
}

export default Splash