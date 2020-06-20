import React from 'react'
import styles from './_Comment.module.scss'
import ProfilePicture from '../../../UI/ProfilePicture'
import PropTypes from 'prop-types'

const Comment = ({ user, comment, header, text }) => 
  <div className={`${styles.comment} ${comment ? user._id === comment.author._id && styles.noHover : styles.noHover}`}>
    {header ? 
    <p style={{ float: "left", marginRight: 5, color: "black" }}>{header}</p> : 
    <ProfilePicture user={comment.author} heightWidth={18} style={{ float: "left", marginRight: 5 }} disable/>}
    <p className={`${comment && user._id !== comment.author._id && styles.text}`}>{text ? text : comment.comment}</p>
  </div>

Comment.propTypes = {
  user: PropTypes.object.isRequired, // User context.
  comment: PropTypes.object,         // Comment object.
  text: PropTypes.string,            // Comment text.
  header: PropTypes.string,          // Replace user img with a string.
}

export default Comment