import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link } from '@reach/router'

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  media: {
    height: 140,
  },
  link: {
    textDecoration: 'none',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
})

const ProductCard = ({ sku, title, image, qauntity }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={image} title={title} /> :
      <CardContent>
        <Typography
          variant={'h5'}
          component={'h4'}
          data-label={'product-title'}
        >
          {title}
        </Typography>
        <Typography
          gutterBottom
          variant={'body2'}
          color={'textSecondary'}
          data-label={'product-sku'}
        >
          Qauntity: {qauntity}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          component={'button'}
          className={classes.link}
          variant={'body2'}
          color={'primary'}
          to={`/product/${sku}`}
          data-label={'product-link'}
        >
          Multi Thread
        </Link>
      </CardActions>
    </Card>
  )
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  qauntity: PropTypes.number.isRequired,
  sku: PropTypes.string.isRequired,
}

export default ProductCard
