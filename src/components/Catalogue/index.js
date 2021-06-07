import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProductTile from './ProductTile';

const Catalogue = (props) => {
  const {
    products,
    name,
    setProduct
  } = props;
  const showDetails = (product) => {
    return () => {
      setProduct(product);
    }
  }
  return (
    <>
      <h1>Categoría {name}</h1>
      <Grid container spacing={2}>
      { !!products ? products.map(product => (
        <Grid item xs={3} key={product._id}>
          <ProductTile showDetails={showDetails(product)} {...product} />
        </Grid>
      )) : (
        <Typography gutterBottom variant="h5" component="h2">
          No hay productos para mostrar
        </Typography>
      ) }
      </Grid>
    </>
  );
}

export default Catalogue;
