import React, { useState } from 'react'
import * as classes from './_Search.module.scss'
import { Search as MagnifyingGlass } from 'react-feather'

const Search = ({ darkMode }) => {
  const [search, setSearch] = useState({
    search: null,
  })

  const updateField = e => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className={`${classes.wrapper} ${darkMode && classes.darkMode}`}>
      <div className={classes.icon}>
        <MagnifyingGlass/>
      </div>
      <input 
        type="text" 
        name="search" 
        id="search" 
        onChange={updateField}>
      </input>
    </div>
  )
}

export default Search