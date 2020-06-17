import React, { useState, useEffect } from 'react'
import Masonry from 'react-masonry-component'
import './_Masonry.scss'
import PropTypes from 'prop-types'
import { removeKey } from '../../shared/utility'

const MasonryComp = ({ array, user, setUser, contained, noInteract }) => {
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

  const masonryClickedHandler = async post => {
    if (user.postClicked) {
      if (post !== user.postClicked) {
        await setUser(removeKey(user, "postClicked"))
        setUser({ ...user, postClicked: post })
      }
    } else {
      await setUser(removeKey(user, "postClicked"))
      setUser({ ...user, postClicked: post })
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
      {array.map(post => noInteract ? 
        <img key={post._id} alt="A Post" src={post.img} className="grid-item no-interact"/> 
        :
        <div 
          key={post._id} 
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