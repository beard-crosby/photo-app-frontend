import React, { useState } from 'react'
import Masonry from 'react-masonry-component'
import './_Masonry.scss'
import PropTypes from 'prop-types'

const MasonryComp = ({ array, user, setUser, contained}) => {
  const [ layoutComplete, setLayoutComplete ] = useState(null)
  
  let itemWidth = "20%"
  if (contained && array.length < 9) {
    if (array.length < 3) {
      itemWidth = "50%"
    } else {
      itemWidth = "25%"
    }
  }

  return (
    <Masonry 
      className={`${contained ? `masonry-contained` : `masonry`} ${layoutComplete}`}
      options={contained ? {
        transitionDuration: 0,
        percentPosition: true,
      } : {
        transitionDuration: 0,
        percentPosition: true,
        itemSelector: ".grid-item", 
        columnWidth: ".grid-sizer",
        gutter: ".gutter-sizer", 
      }}
      onLayoutComplete={() => setLayoutComplete("masonry-complete")}>
      {!contained && 
      <>
        <div className="grid-sizer"/>
        <div className="gutter-sizer"/>
      </>}
      {array.map(post => 
        <div 
          key={post._id} 
          className="grid-item" 
          style={contained && { width: itemWidth }} 
          onClick={() => setUser({ ...user, postClicked: post})}>
          <img alt="A Post" src={post.img}/>
        </div>
      )}
    </Masonry>
  )
}

MasonryComp.propTypes = {
  user: PropTypes.object,  // User object in context.
  setUser: PropTypes.func, // setUser function context function.
  contained: PropTypes.bool,          // Style Masonry in such a way that suits being visually contained.
}

export default MasonryComp