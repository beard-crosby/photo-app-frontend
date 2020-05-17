import React, { useEffect } from 'react'
import styles from './_PhotoCollage.module.scss'
import PhotoCard from '../PhotoCard'

const PhotoCollage = ({ author }) => {
  let cols = []

  for (let i = 0; i < 4; i++) {
    const everyFourth = author.posts.filter((post, index) => index % 4 === i)
    cols.push(
      <div key={i} className={styles.col} id={`col-${i}`}>
        {everyFourth.map((post, it) => <PhotoCard key={it} post={post} author={author} small/>)}
      </div>
    )
  }

  useEffect(() => {
    const colHeightArr = [0, 0, 0, 0]
    cols.forEach((col, i) => {
      for (let post of document.getElementById(`col-${i}`).children) {
        colHeightArr[i] = colHeightArr[i] + post.clientHeight
      }
    })
    const longestCol = document.getElementById(`col-${colHeightArr.indexOf(Math.max(...colHeightArr))}`)
    const shortestCol = document.getElementById(`col-${colHeightArr.indexOf(Math.min(...colHeightArr))}`)
    const lastEl = longestCol.removeChild(longestCol.lastElementChild)
    shortestCol.appendChild(lastEl)
  }, [])

  return (
    <div className={styles.photoCollage}>
      {cols}
    </div>
  )
}

export default PhotoCollage