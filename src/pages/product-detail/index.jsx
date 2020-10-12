import React, { useState, useEffect } from 'react'
import { globalHistory } from '@reach/router'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'

import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {},
  productWrapper: {},
  media: {
    height: 300,
  },
})

const ProductDetail = () => {
  const classes = useStyles()

  const initialState = {
    location: globalHistory.location,
    navigate: globalHistory.navigate,
  }

  const [product, setProduct] = useState({})
  const [, setState] = useState(initialState)

  useEffect(() => {
    const removeListener = globalHistory.listen(params => {
      const { location } = params
      const newState = Object.assign({}, initialState, { location })
      setState(newState)
    })
    return () => {
      removeListener()
    }
  })

  useEffect(() => {
    ;(async () => {
      try {
        const productSku = initialState.location.pathname.replace(
          /^\/product\//,
          '',
        )
        const { data } = await axios.get(
          `https://dwsaepyl0j.execute-api.us-east-1.amazonaws.com/dev/product/find/${productSku}`,
        )
        setProduct(data.data[0])
      } catch (error) {
        console.log('error: ', error)
      }
    })()
  }, [initialState.location.pathname])

  return (
    <Container className={classes.root} maxWidth={'xl'}>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <Card className={classes.productWrapper}>
            <CardMedia
              data-image={'main-image'}
              component={'img'}
              className={classes.media}
              src={
                product.image ??
                'https://via.placeholder.com/450?text=Product+Image'
              }
              title={'product image'}
            />
          </Card>
        </Grid>
        <Grid item md={8}>
          <Typography
            variant={'h5'}
            component={'h2'}
            data-label={'product-title'}
          >
            {product.name ?? '---'}
          </Typography>
          <Typography
            gutterBottom
            variant={'body1'}
            color={'textSecondary'}
            data-label={'product-sku'}
          >
            Qauntity: {product.qauntity ?? '0'}
          </Typography>
          <Typography variant={'body1'} color={'textSecondary'} component={'p'}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
            quibusdam at doloribus sed dolorum maxime libero recusandae odio
            saepe, architecto nesciunt aspernatur reprehenderit illum nobis
            voluptates molestiae. Dolores, dolor nihil?
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductDetail
