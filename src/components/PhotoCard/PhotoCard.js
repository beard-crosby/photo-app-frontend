import React, {useEffect, useState} from 'react'
import * as classes from './PhotoCard.module.scss'

const PhotoCard = ({ ident, img, name, profileImg, style}) => {
  const [overlay, setOverlay] = useState(false)
  const [height, setHeight] = useState(null)
  const [width, setWidth] = useState(null)

  useEffect(() => {
    setHeight(document.getElementsByClassName('PhotoCard_ImgWrapper__1IPFj').item(ident).clientHeight)
    setWidth(document.getElementsByClassName('PhotoCard_ImgWrapper__1IPFj').item(ident).clientWidth)
  }, [])
  console.log(height, width)
  return (
    <div className={classes.PhotoCardWrapper} style={style} onMouseEnter={() => setOverlay(true)} onMouseLeave={() => setOverlay(false)}>
      <div className={classes.ImgWrapper}>
        {img}
      </div>
      {overlay && <div className={classes.Overlay} style={{ height: height - 0.5, width: width }}>
        <div className={classes.SidebarL}>
          <div className={classes.Creator}>
            <div className={classes.ProfilePicture}>
              {profileImg}
            </div>
            <div className={classes.ProfileInfo}>
              <h5>{name}</h5>
            </div>
          </div>
        </div>
        <div className={classes.SidebarR}>
          <div className={classes.Comments}/>
          <input type="text" name="comment" id="comment" placeholder="Write a comment" />
        </div>
      </div>}
    </div>
  )
}

export default PhotoCard