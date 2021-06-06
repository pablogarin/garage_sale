import React from 'react';
import Grid from '@material-ui/core/Grid';
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
      { products.map(product => (
        <Grid item xs={3}>
          <ProductTile key={product._id} showDetails={showDetails(product)} {...product} />
        </Grid>
      )) }
      </Grid>
    </>
  );
}

export default Catalogue;
