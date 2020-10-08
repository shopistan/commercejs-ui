import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { Router } from '@reach/router'
import { hot } from 'react-hot-loader/root'

import App from 'components/app'

const Root = ({ store, apolloClient }) => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <Router>
        <App path="/*" />
      </Router>
    </ApolloProvider>
  </Provider>
)
Root.propTypes = {
  store: PropTypes.object.isRequired,
  apolloClient: PropTypes.object.isRequired,
}

export default hot(Root)
