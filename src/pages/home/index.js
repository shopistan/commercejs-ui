import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'

import ProductCard from '../../components/product-card'

const useStyles = makeStyles({
  loaderContainer: {
    height: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Home = () => {
  const classes = useStyles()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const renderLoader = () => (
    <div className={classes.loaderContainer}>
      <Fade in={loading} style={{ transitionDelay: '800ms' }} unmountOnExit>
        <CircularProgress />
      </Fade>
    </div>
  )

  const renderList = list =>
    list.map(({ _id, name, qauntity, image, sku }, index) => (
      <Grid item md={3} key={`list-item-${index}-${_id}`}>
        <ProductCard sku={sku} title={name} image={image} qauntity={qauntity} />
      </Grid>
    ))

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const { data } = await axios.get(
          'https://dwsaepyl0j.execute-api.us-east-1.amazonaws.com/dev/product/list',
        )

        setProducts(data.data)
        setLoading(false)
      } catch {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Grid container justify={'center'} spacing={3}>
      {products.length ? renderList(products) : renderLoader()}
    </Grid>
  )
}

export default Home
