import React from 'react'
import { Router } from '@reach/router'

import Home from 'components/home'

import lazyLoad from 'libs/utils/lazy-loading'

import Login from 'components/login';

const MultiThreadExample = lazyLoad(() =>
  import('components/multi-thread-example'),
)
const ReduxExample = lazyLoad(() => import('components/redux-example'))

const App = () => {
  return (
    <Router>
      <Home path="/" />
      <MultiThreadExample path="/multi-thread-example" />
      <ReduxExample path="/redux-example" />
      <Login path="/login" />
    </Router>
  )
}

export default App
