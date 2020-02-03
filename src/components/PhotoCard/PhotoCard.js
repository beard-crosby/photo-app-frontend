import React, { useState } from 'react'
import './_PhotoCard.scss'
import PropTypes from 'prop-types'

const PhotoCard = ({ img, name, username, profileImg, comments }) => {
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
        <div className="sidebar-wrapper">
          <div className="creator">
            {profileImg}
            <div className="creator-info">
              <h5>{name}</h5>
              <p>{username}</p>
            </div>
          </div>
          <div className="comments">
            {comments.map((comment, i) => (
              <div className="comment" key={i}>
                <img alt="Profile Image" src={require(`../../static/defaults/${comment.profileImg}`)}/>
                <p>{comment.comment}</p>
              </div>
            ))}
          </div>
          <input type="text" name="comment" placeholder="Write a comment" />
        </div>
      </div>
    </div>
  )
}

PhotoCard.propTypes = {
  img: PropTypes.element, // The image. Height of the image decides the height of the component thus preserving aspect ratio.
  name: PropTypes.string, // Name of the user that uploaded the photo.
  profileImg: PropTypes.element, // Image of the user that uploaded the photo. 
}

export default PhotoCard