import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import Breadcrumb from '../../components/Breadcrumb';
import Gallery from './Gallery';
import useCart, {
  CART_ADD,
} from '../../hooks/useCart';
import { asPrice, formatDate } from '../../utils/productUtils';

const useStyles = makeStyles((theme) => ({
  actions: {
    backgroundColor: theme.palette.background.default,
  }
}));

const ProductDetail = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [cart, dispatch] = useCart();
  const [links, setLinks] = useState();
  const isProductInCart = !!(product && cart?.products && cart.products.find(prd => prd.id === product.id));

  const params = useParams();
  const { productId } = params;

  const classes = useStyles();

  const {
    productClient
  } = props;

  useEffect(() => {
    productClient.get(productId, (product) => {
      setLinks([
        {
          label: 'Home',
          href: '/'
        },
        {
          label: product.category.name,
          href: `/category/${product.category.id}`
        }, {
          label: product.name,
          href: `/product/${product.id}`
        }
      ]);
      setProduct(product);
      setIsLoading(false);
    });
  }, [productClient, productId]);

  const addToCart = () => {
    try {
      dispatch({
        type: CART_ADD,
        payload: {
          product
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  const buttonText = () => {
    if (isProductInCart) {
      return 'Producto Agregado';
    }
    if (product.stock <= 0) {
      return 'Vendido';
    }
    return 'Agregar al Carro';
  }

  return (
    <>
      {isLoading ? ('Loading...') : (
        <>
          <Breadcrumb links={links} />
          <Paper>
            <Box p={3}>
              <Box my={2} align="center">
                <Typography variant="h3">{product.name}</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={5}>
                  <Gallery images={product.images} />
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  sm={7}
                  direction="column"
                  justify="space-between"
                  alignItems="stretch"
                  spacing={2}
                >
                  <Grid item>
                    <Typography variant="subtitle2" gutterBottom>
                      Disponible desde el {formatDate(product.availableDate)}
                    </Typography>
                    <Typography variant="body1">{product.description}</Typography>
                  </Grid>
                  <Grid item container direction="row" alignItems="flex-end">
                    <Grid item xs={12}>
                      <Paper variant="outlined" className={classes.actions}>
                        <Box p={3}>
                          <Grid container alignItems="center" justify="space-between" spacing={3}>
                            <Grid item xs={12} md={7}>
                              <Typography variant="h5" display="inline">Precio:&nbsp;</Typography>
                              <Typography variant="h4" display="inline" noWrap>{asPrice(product.price)}</Typography>
                            </Grid>
                            <Grid item xs={12} md>
                              <Button
                                onClick={() => addToCart()}
                                variant="contained"
                                color="primary"
                                disabled={isProductInCart || product?.stock <= 0}
                                fullWidth
                                size="large"
                              >
                                {buttonText()}
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </>
      )}
    </>
  );
}

export default ProductDetail;
