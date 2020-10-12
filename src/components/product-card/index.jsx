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
  content: {
    padding: '15px 15px 0 15px',
  },
  actions: {
    padding: '8px 15px',
  },
  link: {
    textDecoration: 'none',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
})

const ProductCard = ({ sku, title, image }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardMedia
        component={'img'}
        className={classes.media}
        image={image ?? 'https://via.placeholder.com/250?text=Product+Image'}
        title={title}
      />
      <CardContent className={classes.content}>
        <Typography
          variant={'h5'}
          component={'h4'}
          data-label={'product-title'}
        >
          {title}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Link
          component={'button'}
          className={classes.link}
          variant={'body2'}
          color={'primary'}
          to={`/product/${sku}`}
          data-label={'product-link'}
        >
          Read more
        </Link>
      </CardActions>
    </Card>
  )
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
}

export default ProductCard
