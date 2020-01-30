import React, { useState } from 'react'
import './_PhotoCard.scss'
import PropTypes from 'prop-types'

const PhotoCard = ({ img, name, profileImg }) => {
  const [imgClicked, setImgClicked] = useState(null)

  const imgClickedHandler = () => {
    if (imgClicked === null) {
      setImgClicked("img-clicked")
      document.body.style.overflow = "hidden"
    } else {
      setImgClicked(null)
      document.body.style = "none"
    }
  }

  return (
    <div className={`photo-card-wrapper ${imgClicked}`}>
      <div className="img-wrapper" onClick={() => imgClickedHandler()}>
        {img}
      </div>
      <div className="sidebar">
        <div className="creator">
          {profileImg}
          <h5>{name}</h5>
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