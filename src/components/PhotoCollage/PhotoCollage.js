import React from 'react'
import styles from './_PhotoCollage.module.scss'
import PhotoCard from '../PhotoCard'

const PhotoCollage = ({ author }) => {
  let cols = []

  for (let i = 0; i < 4; i++) {
    let everyFourth = author.posts.filter((post, index) => index % 4 === i)
    cols.push(
      <div key={i} className={styles.col}>
        {everyFourth.map((post, it) => <PhotoCard key={it} post={post} author={author} small/>)}
      </div>
    )
  }

  return (
    <div className={styles.photoCollage}>
      {cols}
    </div>
  )
}

export default PhotoCollage