import React, {useEffect, useState} from 'react'
import * as classes from './PhotoCard.module.scss'

const PhotoCard = ({ ident, img, name, profileImg, style }) => {
  const [height, setHeight] = useState(null)
  useEffect(() => setHeight(document.getElementsByClassName('PhotoCard_ImgWrapper__1IPFj').item(ident).clientHeight), [])

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
    <div className={classes.PhotoCardWrapper} style={style}>
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

export default PhotoCard