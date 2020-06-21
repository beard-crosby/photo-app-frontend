import React, { useContext } from 'react'
import { Context } from '../App'

const NotFound = () => {
  const { user } = useContext(Context)
  
  return (
    <h2 className={user.dark_mode && `not-found-dark-mode`}>Wups! Page Not Found...</h2>
  )
}

export default NotFound