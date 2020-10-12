import React from 'react'
import { Router } from '@reach/router'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Home from 'pages/home'
import ProductDetail from 'pages/product-detail'

const useStyles = makeStyles({
  header: {
    padding: '15px 24px',
    backgroundColor: 'rgba(0,0,0,0.02)',
    marginBottom: 20,

    '& .app-title': {
      marginTop: 10,
      marginBottom: 10,
    },
  },
  pageWrapper: {},
})

const App = () => {
  const classes = useStyles()

  return (
    <div className={classes.pageWrapper}>
      <header className={classes.header}>
        <h4 className="app-title">Fabric Shop</h4>
      </header>

      <div role={'main'}>
        <Container maxWidth={'xl'}>
          <Router>
            <Home path="/" />
            <ProductDetail path="/product/:sku" />
          </Router>
        </Container>
      </div>
    </div>
  )
}

export default App
