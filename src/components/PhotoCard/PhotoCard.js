import React from 'react'
import * as classes from './PhotoCard.module.scss'

const PhotoCard = ({ img, style }) => 
  <div className={classes.PhotoCardWrapper} style={style}>
    <div className={classes.ImgWrapper}>
      {img}
    </div>
    <div className={classes.Sidebar}>
      <div className={classes.Creator}>
        <div className={classes.ProfilePicture}/>
        <div className={classes.ProfileInfo}>
          <h5>Maximilian Crosby</h5>
          <p>Maxiscoolerthansam92</p>
        </div>
      </div>
      <div className={classes.Comments}>

      </div>
    </div>
  </div>

export default PhotoCard