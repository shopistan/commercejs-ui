import React, { useState, useEffect, useCallback } from 'react'
import { globalHistory } from '@reach/router'
import axios from 'axios'
import { IconButton, Icon, Button, TextField } from '@material-ui/core'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'

import ProductAddDialog from '../../components/product-create-dialog'

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
    '&:disabled': {
      backgroundColor: '#f9f9f9',
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
  const [open, setOpen] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(0)
  const [openSnacker, setOpenSnacker] = useState(false)
  const [snackerMessage, setSnackerMessage] = useState('')

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

        const quantityCount = await axios.get(
          `https://9xr7ltlkzc.execute-api.us-east-1.amazonaws.com/dev/inventory/count/${productSku}`,
        )

        let productData = data.data[0]
        const count = quantityCount.data.data.response.count

        productData = {
          ...productData,
          quantity: count ?? 0,
          email: productData.email ?? '',
        }

        setProduct(productData)
      } catch (error) {
        console.log('error: ', error)
      }
    })()
  }, [initialState.location.pathname])

  const procutAddition = useCallback(
    (val, key) => {
      let value = val
      const updateQauntity =
        key === 'increment' ? ++value : value === 0 ? 0 : --value
      setSelectedQuantity(updateQauntity)
    },
    [setSelectedQuantity],
  )

  const inputChange = useCallback(
    ({ target }) => {
      const value = target.value <= 0 ? 0 : target.value
      setSelectedQuantity(value)
    },
    [setSelectedQuantity],
  )

  const openDialog = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = value => {
    const val = { ...value, sku: product.sku }
    setOpen(false)
    value && saveProduct(val)
  }

  const saveProduct = async ({ name, email, sku, quantity }) => {
    let makeData = {
      name,
      email,
      items: [{ sku, quantity }],
    }

    makeData = JSON.stringify(makeData)

    try {
      await axios.post(
        'https://36g50qhl98.execute-api.us-east-1.amazonaws.com/dev/orders/save',
        makeData,
      )

      handleSnacker('Order placed successfully')
    } catch (errer) {
      handleSnacker('Something went wrong')
    }
  }

  const handleSnacker = message => {
    setOpenSnacker(true)
    setSnackerMessage(message)

    setTimeout(() => {
      setOpenSnacker(false)
      setSnackerMessage('')
    }, 2000)
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
            Qauntity: {product.quantity ?? '0'}
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
                onClick={() => procutAddition(selectedQuantity, 'decrement')}
                disabled={selectedQuantity === 0}
              >
                <Icon>remove</Icon>
              </IconButton>
              <TextField
                type="number"
                className={classes.input}
                variant="filled"
                data-label="quantity-input"
                value={selectedQuantity ?? 0}
                onChange={event => inputChange(event)}
              />
              <IconButton
                className={classes.iconButton}
                component="button"
                data-label="increase"
                onClick={() => procutAddition(selectedQuantity, 'increment')}
              >
                <Icon>add</Icon>
              </IconButton>
            </div>
            <Button
              className={classes.submitBtn}
              variant="contained"
              color="primary"
              data-label="add-to-card"
              disabled={selectedQuantity === 0}
              onClick={openDialog}
            >
              Add to Cart
            </Button>
          </div>
        </Grid>
      </Grid>

      {openSnacker ? (
        <Snackbar
          open={openSnacker}
          onClose={handleClose}
          message={snackerMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      ) : null}

      {open ? (
        <ProductAddDialog
          quantity={selectedQuantity}
          open={open}
          onClose={handleClose}
        />
      ) : null}
    </Container>
  )
}

export default ProductDetail
