import React, { useState } from 'react'
import Masonry from 'react-masonry-component'
import './_Masonry.scss'
import PropTypes from 'prop-types'

const MasonryComp = ({ array, user, setUser, contained, noInteract }) => {
  const [ layoutComplete, setLayoutComplete ] = useState(null)
  
  let itemWidth = "20%" // Change width of images and thus how many colums there are based on how many images are in the array.
  if (contained && array.length < 20) {
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
      {array.map(post => noInteract ? 
        <img key={post._id} alt="A Post" src={post.img} className="grid-item no-interact"/> 
        :
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
  array: PropTypes.array,     // Array of posts in which to loop through.
  user: PropTypes.object,     // User object in context.
  setUser: PropTypes.func,    // setUser function context function.
  contained: PropTypes.bool,  // Style Masonry in such a way that suits being visually contained.
  noInteract: PropTypes.bool, // Render just images. No user interaction intended.
}

export default MasonryComp