import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {},
  input: {
    width: '100%',
  },
  mb20: {
    marginBottom: 20,
  },
})

const ProductAddDialog = props => {
  const classes = useStyles()

  const { onClose, product, open } = props
  const [state, setState] = useState({ name: '', email: '', quantity: 0 })

  useEffect(() => {
    setState({ ...product })
  }, [product, setState])

  const handleClose = () => {
    onClose()
  }

  const handleSave = event => {
    event.preventDefault()
    onClose(state)
  }

  const inputChange = useCallback(
    ({ target }) => {
      const value =
        target.name === 'quantity' ? parseInt(target.value) : target.value
      setState({ ...state, [target.name]: value })
    },
    [state],
  )

  return (
    <Dialog
      fullWidth={true}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Add to Cart</DialogTitle>
      <form onSubmit={handleSave}>
        <DialogContent dividers>
          <div className={classes.mb20}>
            <TextField
              type="text"
              className={classes.input}
              data-label="name"
              name="name"
              value={state.name ?? ''}
              placeholder="Name"
              onChange={event => inputChange(event)}
            />
          </div>
          <div className={classes.mb20}>
            <TextField
              type="email"
              className={classes.input}
              data-label="email"
              name="email"
              value={state.email ?? ''}
              placeholder="Email"
              onChange={event => inputChange(event)}
            />
          </div>
          <div className={classes.mb20}>
            <TextField
              type="number"
              className={classes.input}
              data-label="quantity"
              name="quantity"
              value={state.quantity ?? 0}
              placeholder="Quantity"
              onChange={event => inputChange(event)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
            Proceed
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

ProductAddDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  product: PropTypes.object.isRequired,
}

export default ProductAddDialog
