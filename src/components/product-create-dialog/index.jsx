import React from 'react'
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
import { Formik } from 'formik'
import * as Yup from 'yup'

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

  const { onClose, quantity, open } = props
  const initialValues = { name: '', email: '', quantity: quantity }

  const handleClose = () => {
    onClose()
  }

  const handleSave = values => {
    onClose(values)
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email Required'),
    quantity: Yup.number()
      .min(1, 'minimum 1')
      .required('Quantit Required'),
  })

  return (
    <Dialog
      fullWidth={true}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Add to Cart</DialogTitle>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async values => handleSave(values)}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <DialogContent dividers>
                <div className={classes.mb20}>
                  <TextField
                    type="text"
                    className={classes.input}
                    data-label="name"
                    name="name"
                    value={values.name}
                    placeholder="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name}</div>
                  )}
                </div>
                <div className={classes.mb20}>
                  <TextField
                    type="email"
                    className={classes.input}
                    data-label="email"
                    name="email"
                    value={values.email}
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                  )}
                </div>
                <div className={classes.mb20}>
                  <TextField
                    type="number"
                    className={classes.input}
                    data-label="quantity"
                    name="quantity"
                    value={values.quantity}
                    placeholder="Quantity"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.quantity && touched.quantity && (
                    <div className="input-feedback">{errors.quantity}</div>
                  )}
                </div>
              </DialogContent>
              <DialogActions>
                <Button type="submit" variant="contained" color="primary">
                  Proceed
                </Button>
              </DialogActions>
            </form>
          )
        }}
      </Formik>
    </Dialog>
  )
}

ProductAddDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
}

export default ProductAddDialog
