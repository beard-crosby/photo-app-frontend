import React, { useContext } from 'react'
import { UserContext } from '../App'

const NotFound = () => {
  const { user } = useContext(UserContext)
  
  return (
    <h2 className={user.dark_mode && `not-found-dark-mode`}>Wups! Page Not Found...</h2>
  )
}

export default NotFound