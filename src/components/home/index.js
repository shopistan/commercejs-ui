import React from 'react'

import Introduction from 'components/introduction'

import logo from 'images/logo.svg'

import './style.scss'

const Home = () => (
  <div className="app">
    <header className="app-header">
      <img src={logo} alt="App logo" className="app-logo" />
      <h1 className="app-title">Welcome to React</h1>
    </header>
    <p className="app-intro">Welcome to the shopdev frontend boilerplate.</p>
    <div className="app-image" />
    <Introduction />
  </div>
)

export default Home
