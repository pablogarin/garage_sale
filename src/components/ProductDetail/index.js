import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useParams } from "react-router-dom";
import Breadcrumb from '../../components/Breadcrumb';
import useCart, {
  CART_ADD,
} from '../../hooks/useCart';
import { asPrice, formatDate } from '../../utils/productUtils';

const ProductDetail = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [cart, dispatch] = useCart();
  const [links, setLinks] = useState();
  const isProductInCart = !!(product && cart?.products && cart.products.find(prd => prd.id === product.id));

  const params = useParams();
  const { productId } = params;

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
      return 'Sin Stock';
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
              <Box my={2}>
                <Typography variant="h3">{product.name}</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={5}>
                  <img
                    alt={product.name}
                    src={product.image}
                    onError={(evt) => evt.target.src= '/img/no-image-icon.png'}
                    width="100%"
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Typography variant="subtitle2" gutterBottom>
                    Disponible desde el {formatDate(product.availableDate)}
                  </Typography>
                  <Typography variant="body1" gutterBottom>{product.description}</Typography>
                  <Box mt={3}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="h5">{asPrice(product.price)}</Typography>
                      </Grid>
                      <Grid container item xs={6} justify="flex-end">
                        <Button
                          onClick={() => addToCart()}
                          variant="contained"
                          color="primary"
                          disabled={isProductInCart || product?.stock <= 0}
                        >
                          {buttonText()}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
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
