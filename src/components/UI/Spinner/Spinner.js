import React, { useContext } from 'react'
import { UserContext } from '../../../App'
import './_Spinner.scss'

const Spinner = () => {
  const { user } = useContext(UserContext)

  return (
    <div className={`spinner-bg ${user.dark_mode && `dark-mode-bg`}`}>
      <div className="sk-folding-cube">
        <div className={`sk-cube1 sk-cube ${user.dark_mode && `dark-mode`}`}/>
        <div className={`sk-cube2 sk-cube ${user.dark_mode && `dark-mode`}`}/>
        <div className={`sk-cube4 sk-cube ${user.dark_mode && `dark-mode`}`}/>
        <div className={`sk-cube3 sk-cube ${user.dark_mode && `dark-mode`}`}/>
      </div>
    </div>
  )
}

export default Spinner