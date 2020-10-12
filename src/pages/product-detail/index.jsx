import React, { useState, useEffect } from 'react'
import { globalHistory } from '@reach/router'
import axios from 'axios'
import { IconButton, Icon, Button, TextField } from '@material-ui/core'

import { makeStyles, useTheme } from '@material-ui/core/styles'

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
  mb20: {
    marginBottom: 20,
  },
  controlsWrap: {
    width: 250,
  },
  submitBtn: {
    width: '100%',
  },
  quantityControls: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    width: 130,
    '& .MuiFilledInput-input': {
      padding: 12,
      textAlign: 'center',
    },
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    '&:hover': {
      color: '#fff',
      backgroundColor: props => props.palette.primary.main,
    },
  },
})

const ProductDetail = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const initialState = {
    location: globalHistory.location,
    navigate: globalHistory.navigate,
  }

  const [product, setProduct] = useState({})
  const [, setState] = useState(initialState)
  const [productCount, setProductCount] = useState(0)
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

  const procutAddition = val => {
    let value = productCount
    setProductCount(val === 'decrement' ? --value : ++value)
  }

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
            className={classes.mb20}
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
          <div className={classes.controlsWrap}>
            <div className={classes.quantityControls}>
              <IconButton
                className={classes.iconButton}
                component="button"
                data-label="decrease"
                onClick={() => procutAddition('decrement')}
              >
                <Icon>remove</Icon>
              </IconButton>
              <TextField
                type="number"
                className={classes.input}
                variant="filled"
                data-label="quantity-input"
                value={productCount}
              />
              <IconButton
                className={classes.iconButton}
                component="button"
                data-label="increase"
                onClick={() => procutAddition('increment')}
              >
                <Icon>add</Icon>
              </IconButton>
            </div>
            <Button
              className={classes.submitBtn}
              variant="contained"
              color="primary"
              data-label="add-to-card"
            >
              Add to Cart
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductDetail
