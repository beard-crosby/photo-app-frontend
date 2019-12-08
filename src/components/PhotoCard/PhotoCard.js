import React, { useEffect, useState } from 'react'
import * as classes from './_PhotoCard.module.scss'
import PropTypes from 'prop-types'

const PhotoCard = ({ ident, img, name, profileImg }) => {
  const [height, setHeight] = useState(null)
  const [imgClicked, setImgClicked] = useState(null)

  // Target the specific DOM element with ident and find the height and update height state with the px number. 
  useEffect(() => setHeight(document.getElementsByClassName('_PhotoCard_ImgWrapper__3S6GQ').item(ident).clientHeight), [ident])
  height === 0 && PhotoCard() // re-render the PhotoCard if there's no height data.

  // When image is clicked add the imgClicked class, making the image full screen. Also, stop the user from being able to scroll by adding overflow: 'hidden' to body.
  // When image is clicked again, remove the imgClicked class and remove overflow: 'hidden' from body.
  const imgClickedHandler = () => {
    if (imgClicked === null) {
      setImgClicked(classes.imgClicked)
      document.body.style.overflow = "hidden"
    } else {
      setImgClicked(null)
      document.body.style = "none"
    }
  }

  const creatorJSX = (
    <>
      <div className={classes.ProfilePicture}>
        {profileImg}
      </div>
      <div className={classes.ProfileInfo}>
        <h5>{name}</h5>
      </div>
    </>
  )
  
  return (
    <div className={`${classes.PhotoCardWrapper} ${imgClicked}`} style={window.matchMedia("(min-width: 600px)").matches ? { marginBottom: 40 } : { marginBottom: 20 }}>
      <div className={classes.CreatorMobile}>
        {creatorJSX}
      </div>
      <div className={classes.ImgWrapper} onClick={() => imgClickedHandler()}>
        {img}
      </div>
      <div className={classes.Sidebar} style={window.matchMedia("(min-width: 600px)").matches ? { height: height } : null}>
        <div className={classes.SidebarTop}>
          <div className={classes.Creator}>
            {creatorJSX}
          </div>
          <div className={classes.Comments}/>
        </div>
        <input type="text" name="comment" id="comment" placeholder="Write a comment" />
      </div>
    </div>
  )
}

PhotoCard.propTypes = {
  ident: PropTypes.number, // Identity number of the element. Need this to find the specific Photocard element on the page to calculate the height for the sidebar.
  img: PropTypes.element, // The image. Height of the image decides the height of the component thus preserving aspect ratio.
  name: PropTypes.string, // Name of the user that uploaded the photo.
  profileImg: PropTypes.element, // Image of the user that uploaded the photo. 
}

export default PhotoCard