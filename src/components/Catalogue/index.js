import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import ProductTile from './ProductTile';

const Catalogue = (props) => {
  const {
    products,
    name
  } = props;
  const history = useHistory();
  const showDetails = (product) => {
    history.push(`/product/${product._id}`);
  }
  return (
    <>
      <h1>Categoría {name}</h1>
      <Grid container spacing={2}>
      { !!products ? products.map(product => (
        <Grid item xs={3} key={product._id}>
          <ProductTile showDetails={() => showDetails(product)} {...product} />
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
