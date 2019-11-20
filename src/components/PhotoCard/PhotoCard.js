import React, { useEffect, useState } from 'react'
import * as classes from './_PhotoCard.module.scss'
import PropTypes from 'prop-types'

const PhotoCard = ({ ident, img, name, profileImg }) => {
  const [height, setHeight] = useState(null)
  
  useEffect(() => setHeight(document.getElementsByClassName('_PhotoCard_ImgWrapper__3S6GQ').item(ident).clientHeight), [ident])

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
    <div className={classes.PhotoCardWrapper} style={window.matchMedia("(min-width: 600px)").matches ? { marginBottom: 40 } : { marginBottom: 20 }}>
      <div className={classes.CreatorMobile}>
        {creatorJSX}
      </div>
      <div className={classes.ImgWrapper}>
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
  ident: PropTypes.number,
  img: PropTypes.element,
  name: PropTypes.string,
  profileImg: PropTypes.element,
}

export default PhotoCard