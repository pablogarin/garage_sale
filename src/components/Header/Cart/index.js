import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import useCart, { CART_DEL } from '../../../hooks/useCart';
import { asPrice } from '../../../utils/productUtils';

const useStyles = makeStyles((theme) => ({
  cartAction: {
    width: '100%'
  },
  cartTotal: {
    width: '100%'
  }
}));

const Cart = () => {
  const [cart, dispatch] = useCart();
  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    if (cart) {
      setProducts(cart.products);
    }
  }, [cart]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteFromCart = (id) => {
    dispatch({
      type: CART_DEL,
      payload: { product: { id } }
    });
  }
  const goToCart = () => {
    history.push('/cart');
    setAnchorEl(null);
  }
  return (
    <>
      <IconButton color="inherit" aria-controls="Carro" aria-haspopup="true" onClick={handleClick}>
        <Badge badgeContent={products && products.length} color="error">
          <ShoppingCartOutlinedIcon />
        </Badge>
      </IconButton>
      <Menu
        id="Carro"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box p={2} align="center">
              <Typography variant="h6" noWrap>Carro de Compras</Typography>
            </Box>
          </Grid>
        </Grid>
        {products && products.length > 0 ? (
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item xs={12}>
              <List width={1}>
                {products.map(product => (
                  <ListItem
                    key={product.id}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar alt={product.name} src={product.images[0]} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.name}
                      secondary="(x1)"
                    >
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Box pl={4}>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          size="small"
                          onClick={() => deleteFromCart(product.id)}
                        >
                          <ClearIcon size="inherit" />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} container justify="flex-end" alignItems="stretch">
              <Box mt={2} px={1} align="right" className={classes.cartTotal}>
                <Typography variant="h6" noWrap>Total: {asPrice(cart.total)}</Typography>
              </Box>
            </Grid>
            <Grid
              container
              item
              xs={12}
              spacing={2}
              justify="space-between"
            >
              <Box mt={2} p={1} className={classes.cartAction}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={goToCart}
                  fullWidth
                  size="large"
                >
                  Ir a Pagar&nbsp;
                  <ArrowForwardRoundedIcon />
                </Button>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Box p={2} className={classes.cartTotal} align="center">
              <Paper variant="outlined">
                <Typography variant="h6">Carro Vacio</Typography>
              </Paper>
            </Box>
          </Grid>
        )}
      </Menu>
    </>
  )
}

export default Cart
