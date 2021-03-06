import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from "react-router-dom";
import Breadcrumb from '../Breadcrumb';
import ProductTile from './ProductTile';
import FilterBar from './FilterBar';

const useStyles = makeStyles(() => ({
  filterBar: {
    marginBottom: 24
  }
}));

const Catalogue = ({ categoryClient, productClient }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState(null);
  const [links, setLinks] = useState(null);
  const [sortMethod, setSortMethod] = useState(null);
  const history = useHistory();
  const params = useParams();
  const { categoryId } = params;
  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    if (categoryId) {
      categoryClient.get(categoryId, (category) => {
        setLinks([
          {
            label: 'Home',
            href: '/'
          },
          {
            label: category.name,
            href: `/category/${category.id}`
          }
        ])
        setName(category.name);
        setProducts(category.products);
        setIsLoading(false);
      })
    } else {
      productClient.getAll((products) => {
        setName('Home');
        setLinks([
          {
            label: 'Home',
            href: '/'
          },
        ])
        setProducts(products);
        setIsLoading(false);
      });
    }
  }, [categoryClient, productClient, categoryId]);

  useEffect(() => {
    if (sortMethod) {
      const productList = products.sort(sortMethod.func);
      setProducts(productList);
      setSortMethod(null);
    }
  }, [sortMethod, products]);

  const showDetails = (product) => {
    history.push(`/product/${product.id}`);
  }
  const renderSkeleton = () => {
    const emptyList = [1, 2, 3, 4];
    return (
      <>
        <Box py={3}>
          <Skeleton variant="rect" height={20} />
        </Box>
        <h1><Skeleton variant="text" /></h1>
        <Grid container spacing={2}>
        { emptyList.map((i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Skeleton variant="rect" height={240} />
          </Grid>
        )) }
        </Grid>
      </>
    )
  }
  return (
    <>
      {isLoading ? renderSkeleton() : (
        <>
          <Breadcrumb links={links} />
          <Box pb={2}>
            <Typography variant="h4">{name}</Typography>
          </Box>
          <Grid container spacing={2} className={classes.filterBar}>
            <Grid item xs={12}>
              <FilterBar setSortMethod={setSortMethod} />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="stretch">
            { !!products ? products.map(product => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductTile showDetails={() => showDetails(product)} {...product} />
            </Grid>
            )) : (
            <Typography gutterBottom variant="h5" component="h2">
              No hay productos para mostrar
            </Typography>
            ) }
          </Grid>
        </>
      )}
    </>
  );
}

export default Catalogue;
