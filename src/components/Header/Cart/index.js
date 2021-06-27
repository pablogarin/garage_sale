import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from '@material-ui/core/Menu';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import useCart, { CART_DEL } from '../../../hooks/useCart';

const Cart = () => {
  const [cart, dispatch] = useCart();
  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

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
        <Badge badgeContent={products && products.length} color="secondary">
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
            <Box  m={3}>
              <Typography>Carro de Compras</Typography>
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
                      <Avatar alt="Remy Sharp" src={product.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.name}
                      secondary="(x1)"
                    >
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Box pl={2}>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={() => deleteFromCart(product.id)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} container justify="flex-end">
              <Box px={3}>
                <Typography>${cart.total}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box mt={3}>
                <Button variant="contained" color="primary" onClick={goToCart}>Ir a Pagar</Button>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Box p={2}>
              <Typography>Carro Vacio</Typography>
            </Box>
          </Grid>
        )}
      </Menu>
    </>
  )
}

export default Cart
