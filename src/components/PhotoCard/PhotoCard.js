import React, { useEffect, useState } from 'react'
import './_PhotoCard.scss'
import PropTypes from 'prop-types'

const PhotoCard = ({ img, name, username, profileImg, comments, ident }) => {
  const [height, setHeight] = useState(null)
  const [imgClicked, setImgClicked] = useState(null)

  // Target the specific DOM element with ident and find the height and update height state with the px number. 
  useEffect(() => setHeight(document.getElementsByClassName('photo-card-wrapper').item(ident).clientHeight), [ident])
  height === 0 && PhotoCard() // re-render the PhotoCard if there's no height data.

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
          <div className="creator-info">
            <h5>{name}</h5>
            <p>{username}</p>
          </div>
        </div>
        <div className="comments" style={{ height: height - 96 }}>
          {comments.map(comment => (
            <div className="comment">
              <img alt="Profile Image" src={require(`../../static/defaults/${comment.profileImg}`)}/>
              <p>{comment.comment}</p>
            </div>
          ))}
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