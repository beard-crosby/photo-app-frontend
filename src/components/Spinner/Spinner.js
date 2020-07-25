import React from 'react'
import styles from './_Spinner.module.scss'
import PropTypes from 'prop-types'

const Spinner = ({ user, noBG, whiteBG }) => 
  <div className={`${styles.spinnerBG} ${user.settings.dark_mode && styles.darkModeBG} ${noBG && styles.noBG} ${whiteBG && styles.whiteBG}`}>
    <div className={styles.skFoldingCube}>
      <div className={`${styles.skCube1} ${styles.skCube} ${user.settings.dark_mode && styles.darkMode}`}/>
      <div className={`${styles.skCube2} ${styles.skCube} ${user.settings.dark_mode && styles.darkMode}`}/>
      <div className={`${styles.skCube4} ${styles.skCube} ${user.settings.dark_mode && styles.darkMode}`}/>
      <div className={`${styles.skCube3} ${styles.skCube} ${user.settings.dark_mode && styles.darkMode}`}/>
    </div>
  </div>

Spinner.propTypes = {
  user: PropTypes.object, // User Object in context.
  noBG: PropTypes.bool,   // True = do not display background.
}

export default Spinner