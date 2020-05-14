import React from 'react'
import '../scss/_splash.scss'
import Create from './Create'
import Button from '../components/UI/Button'

const Splash = () => 
  <>
    <div className="app-and-signup">
      <div className="app">
        <img alt="iPhone 11" src={require("../static/misc/iphone-template.png")}/>
      </div>
      <div className="signup">
        <Create 
        style={{ width: '100%' }}
        stackButtons
        hideTopRight
        hideBottom/>
      </div>
    </div>
    <div className="splash-content">
      <div className="splash-row">
        <div className={`splash-img-container hideMobile`}>
          <img className="icon" alt="heart icon" src={require("../static/misc/heart.png")}/>
          <img className="icon" alt="like icon" src={require("../static/misc/like.png")}/>
          <img className="icon" alt="comments icon" src={require("../static/misc/comments.png")}/>
        </div>
        <div className="splash-col">
          <h1>No accumulative data!</h1>
          <p>We don't count likes or comments. Just share your work or enjoy the work of others without any ulterior motive.</p>
        </div>
        <div className={`splash-img-container hideDesktop`}>
          <img className="icon" alt="heart icon" src={require("../static/misc/heart.png")}/>
          <img className="icon" alt="like icon" src={require("../static/misc/like.png")}/>
          <img className="icon" alt="comments icon" src={require("../static/misc/comments.png")}/>
        </div>
      </div>
      <div className="splash-row">
        <div className="splash-col">
          <h1>Preserved Aspect Ratio!</h1>
          <p>The Aspect Ratio of your work will always be preserved so people can enjoy your work as you intended.</p>
        </div>
        <div className="splash-img-container">
          <img alt="aspect ratio icon" src={require("../static/misc/aspect-ratio.png")}/>
        </div>
      </div>
      <div className="splash-row">
        <div className={`splash-img-container hideMobile`}>
          <img alt="resolution icon" src={require("../static/misc/resolution.png")}/>
        </div>
        <div className="splash-col">
          <h1>Large file sizes!</h1>
          <p>We accept high resolution images with large file sizes to preserve the quality of your work.</p>
        </div>
        <div className={`splash-img-container hideDesktop`}>
          <img alt="resolution icon" src={require("../static/misc/resolution.png")}/>
        </div>
      </div>
      <div className="splash-row">
        <div className="splash-col">
          <h1>Professionally Presented!</h1>
          <p>Your work is presented in a clean and professional manner resulting in a perfect environment to display your work.</p>
        </div>
        <div className="splash-img-container">
          <img alt="portfolio icon" src={require("../static/misc/portfolio.png")}/>
        </div>
      </div>
      <div className="splash-row">
        <div className={`splash-img-container hideMobile`}>
          <h2>- PHOTO APP -</h2>
        </div>
        <div className="splash-col">
          <h1>Easy Watermarking!</h1>
          <p>If you're cautious about protecting your work, we offer the ability to apply a watermark as you upload.</p>
        </div>
        <div className={`splash-img-container hideDesktop`} style={{ height: '120px' }}>
          <h2>- PHOTO APP -</h2>
        </div>
      </div>
    </div>
    <div className={`app hideDesktop`} style={{ marginTop: '40px' }}>
      <img alt="iPhone 11" src={require("../static/misc/iphone-template.png")}/>
      <div className="app-btn-wrapper" style={{ margin: '40px 0 0 0' }}>
        <a href="https://www.apple.com/uk/ios/app-store/"><Button appleIMG text="App Store"/></a>
        <a href="https://play.google.com/store/apps?hl=en"><Button googleIMG text="Google Play"/></a>
      </div>
    </div>
  </>

export default Splash