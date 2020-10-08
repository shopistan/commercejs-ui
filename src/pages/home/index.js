import React from 'react';

import Grid from '@material-ui/core/Grid';

import ProductCard from 'components/product-card';

const Home = () => (
  <Grid container spacing={3}>
    <Grid item xs>
      <ProductCard image={ 'https://material-ui.com/static/images/cards/paella.jpg' } />
    </Grid>
    <Grid item xs>
      <ProductCard title={ 'Lizards' } image={ 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg' } />
    </Grid>
    <Grid item xs>
      <ProductCard title={ 'Lizards' } image={ 'https://material-ui.com/static/images/cards/paella.jpg' } />
    </Grid>
    <Grid item xs>
      <ProductCard title={ 'Lizards' } image={ 'https://material-ui.com/static/images/cards/paella.jpg' } />
    </Grid>
  </Grid>
)

export default Home
