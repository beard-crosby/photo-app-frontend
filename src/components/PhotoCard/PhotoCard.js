import React from 'react'
import * as classes from './PhotoCard.module.scss'

const PhotoCard = ({ img, name, profileImg, style }) => 
  <div className={classes.PhotoCardWrapper} style={style}>
    <div className={classes.ImgWrapper}>
      {img}
    </div>
    <div className={classes.Sidebar}>
      <div className={classes.Creator}>
          {profileImg}
          <h5>{name}</h5>
      </div>
      <div className={classes.Comments}>
        <input type="text" name="comment" id="comment" placeholder="Write a comment" />
      </div>
    </div>
  </div>

export default PhotoCard
