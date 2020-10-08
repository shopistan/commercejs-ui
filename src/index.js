import React from 'react'
import { render } from 'react-dom'

import { initAxiosInterceptors } from 'libs/utils/axios-interceptors'
import configureStore from 'libs/store'
import configureApolloClient from 'libs/apollo'

import Root from 'components/root'

import 'normalize.css'

console.log(`Version: ${APP_VERSION} - ${GIT_COMMIT_HASH}`)

initAxiosInterceptors()

const store = configureStore()
const apolloClient = configureApolloClient()

render(
  <Root store={store} apolloClient={apolloClient} />,
  document.getElementById('root'),
)
