import React, { useEffect } from 'react'
import { notActive } from '../../shared/miscRequests'

const Footer = ({ user, setUser }) => {
  useEffect(() => {
    !user.token && user.active && notActive(user, setUser)
  },[user.token])
  
  return (
    <footer>
      <p>Beard-Crosby &copy;</p>
    </footer>
  )
}

export default Footer