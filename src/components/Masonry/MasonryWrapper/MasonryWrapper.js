import React from 'react'
import Masonry from '../Masonry'

const MasonryWrapper = ({ children, user }) => 
  <div className="masonry-wrapper">
    {user.posts && <Masonry array={user.posts[0]} style={{ width: "25%", marginRight: 3.5 }} cols={1} noInteract/>}
    <div className="flex-col" style={{ width: "50%", margin: "0 3.5px" }}>
      <div className="masonry-top-mid">
        {user.posts && <Masonry array={user.posts[1]} cols={2} noInteract originTop/>}
      </div>
      {children}
      {user.posts && <Masonry array={user.posts[2]} cols={2} noInteract/>}
    </div>
    {user.posts && <Masonry array={user.posts[3]} style={{ width: "25%", marginLeft: 3.5 }} cols={1} noInteract/>}
  </div>

export default MasonryWrapper