import React, { useState, useEffect } from 'react'
import Masonry from 'react-masonry-component'
import './_Masonry.scss'
import PropTypes from 'prop-types'

const MasonryComp = ({ array, postClicked, setPostClicked, contained, noInteract }) => {
  const [ layoutComplete, setLayoutComplete ] = useState(false)
  const [ imgsLoaded, setimgsLoaded ] = useState(false)
  const [ display, setDisplay ] = useState(null)

  useEffect(() => {
    layoutComplete && imgsLoaded && setDisplay("masonry-complete")
  }, [layoutComplete, imgsLoaded, setDisplay])
  
  let itemWidth = "20%" // Change width of images and thus how many colums there are based on how many images are in the array.
  if (contained && array.length < 20) {
    if (array.length < 3) {
      itemWidth = "50%"
    } else {
      itemWidth = "25%"
    }
  }

  const masonryClickedHandler = post => {
    if (postClicked) {
      post !== postClicked && setPostClicked({...post, postClicked: true})
    } else {
      setPostClicked({...post, postClicked: true})
    }
  }

  return (
    <Masonry 
      className={`${contained ? `masonry-contained` : `masonry`} ${display}`}
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
      onLayoutComplete={() => setLayoutComplete(true)}
      onImagesLoaded={() => setimgsLoaded(true)}>
      {!contained && 
      <>
        <div className="grid-sizer"/>
        <div className="gutter-sizer"/>
      </>}
      {array.map((post, i) => noInteract ? 
        <img key={i} alt="A Post" src={post.img} className="grid-item no-interact"/> 
        :
        <div 
          key={i} 
          className="grid-item" 
          style={contained && { width: itemWidth }} 
          onClick={() => masonryClickedHandler(post)}>
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