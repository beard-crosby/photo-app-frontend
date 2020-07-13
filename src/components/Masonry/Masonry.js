import React, { useState, useEffect } from 'react'
import Masonry from 'react-masonry-component'
import './_Masonry.scss'
import PropTypes from 'prop-types'

const MasonryComp = ({ array, postClicked, setPostClicked, contained, noInteract, style, itemStyle, cols, originTop }) => {
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

  let gridItem = "grid-item"
  let gridSizer = "grid-sizer"
  let gutterSizer = "gutter-sizer"
  
  if (cols === 1) {
    gridItem = "grid-item-100"
    gridSizer = "grid-sizer-100"
    gutterSizer = "gutter-sizer-0"
  } else if (cols === 2) {
    gridItem = "grid-item-48"
    gridSizer = "grid-sizer-48"
    gutterSizer = "gutter-sizer-3"
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
      style={style}
      options={contained ? {
        transitionDuration: 0,
        percentPosition: true,
        originTop: originTop ? false : true,
      } : {
        transitionDuration: 0,
        percentPosition: true,
        itemSelector: `.${gridItem}`, 
        columnWidth: `.${gridSizer}`,
        gutter: `.${gutterSizer}`,
        originTop: originTop ? false : true,
      }}
      onLayoutComplete={() => setLayoutComplete(true)}
      onImagesLoaded={() => setimgsLoaded(true)}>
      {!contained && 
      <>
        <div className={gridSizer}/>
        <div className={gutterSizer}/>
      </>}
      {array.map((post, i) => noInteract ? 
        <img 
          key={i}
          style={itemStyle}
          className={`${gridItem} no-interact`}
          alt="A Post" src={post.img}/>
        :
        <div
          key={i}
          style={itemStyle}
          className={gridItem}
          style={contained && { width: itemWidth }} 
          onClick={() => masonryClickedHandler(post)}>
          <img alt="A Post" src={post.img}/>
        </div>
      )}
    </Masonry>
  )
}

MasonryComp.propTypes = {
  array: PropTypes.array,      // Array of posts in which to loop through.
  user: PropTypes.object,      // User object in context.
  setUser: PropTypes.func,     // setUser function context function.
  contained: PropTypes.bool,   // Style Masonry in such a way that suits being visually contained.
  noInteract: PropTypes.bool,  // Render just images. No user interaction intended.
  style: PropTypes.object,     // Pass up style.
  styleItem: PropTypes.object, // Pass up style on item.
  cols: PropTypes.number,      // Amount of columns.
  originTop: PropTypes.bool,   // Masonry starts from the bottom of the container.
}

export default MasonryComp