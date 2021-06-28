import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useCart, {
  CART_ADD,
} from '../../../hooks/useCart';
import { asPrice } from '../../../utils/productUtils';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: '10%',
  },
});

const ProductTile = (props) => {
  const {
    id,
    name,
    image,
    price,
    availableDate,
    showDetails,
    stock
  } = props;

  const [cart, dispatch] = useCart();
  const isProductInCart = !!(cart?.products && cart.products.find(prd => prd.id === id));

  const classes = useStyles();

  const addToCart = () => {
    const product = {
      id,
      name,
      price,
      availableDate,
      stock
    }
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
    if (stock <= 0) {
      return 'Sin Stock';
    }
    return 'Agregar al Carro';
  }

  return (
    <Card>
      <CardActionArea onClick={showDetails}>
        <CardHeader
          title={name}
        />
        <CardMedia
          component="img"
          alt={name}
          className={classes.media}
          image={image}
          title={name}
          onError={(e) => {
            e.target.src = '/img/no-image-icon.png';
          }}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Disponible desde el {availableDate}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {asPrice(price)}
          </Typography>
        </CardContent>  
      </CardActionArea>
      <CardActions>
        <Grid container justify="center">
          <Button
            color="primary"
            onClick={addToCart}
            disabled={isProductInCart || stock <= 0}
            variant="contained"
          >
            {buttonText()}
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default ProductTile;
