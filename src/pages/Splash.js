import React from 'react'
import '../scss/_splash.scss'
import Create from './Create'

const Splash = () => 
  <>
    <div className="app-and-signup">
      <div className="app">

      </div>
      <div className="signup">
        <Create 
          style={{ width: '100%' }}
          btnStyle={{ flexFlow: 'column nowrap', minHeight: '150px' }}
          topRight={<></>}
          hideBottom/>
      </div>
    </div>
  </>

export default Splash