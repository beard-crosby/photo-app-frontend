import React, {useEffect, useState, useContext} from 'react'
import { UserContext } from '../../App'
import * as classes from './_PhotoCard.module.scss'

const PhotoCard = ({ ident, img, name, profileImg }) => {
  const { darkMode } = useContext(UserContext)
  const [height, setHeight] = useState(null)
  
  useEffect(() => setHeight(document.getElementsByClassName('_PhotoCard_ImgWrapper__3S6GQ').item(ident).clientHeight), [])

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
    <div className={darkMode ? `${classes.darkMode} ${classes.PhotoCardWrapper}` : classes.PhotoCardWrapper} style={window.matchMedia("(min-width: 600px)").matches ? { marginBottom: 40 } : { marginBottom: 20 }}>
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