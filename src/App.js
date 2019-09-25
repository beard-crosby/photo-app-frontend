import React from 'react';
import './scss/base.scss'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Router from './Router'

const App = () => 
  <>
    <Nav/>
    <main>
      <Router/>
    </main>
    <Footer/>
  </>

export default App;
