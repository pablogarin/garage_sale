import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ClearIcon from '@material-ui/icons/Clear';
import useCart, { CART_DEL } from '../../hooks/useCart';
import { asPrice } from '../../utils/productUtils';

const Cart = () => {
  const [cart, dispatch] = useCart();
  const history = useHistory();

  const goToHome = () => {
    history.push("/");
  }

  const goToCheckout = () => {
    history.push("/checkout");
  }

  const deleteProduct = (id) => {
    dispatch({
      type: CART_DEL,
      payload: {
        product: { id }
      }
    })
  }

  return (
    <Box py={3}>
      <Grid container>
        <Grid item xs={12} align="center">
          <Typography variant="h4" gutterBottom>Carro de Compras</Typography>
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item xs={12} container justify="space-between" align="left">
        <TableContainer component={Paper}>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  <Typography variant="subtitle1">Detallles</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1">Precio</Typography>
                </TableCell>
                <TableCell align="right" size="small"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">Producto</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2">Cant.</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2">Valor</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2">Total</Typography>
                </TableCell>
                <TableCell align="right" size="small"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { cart?.products && cart.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell align="right">{product.quantity}</TableCell>
              <TableCell align="right">{asPrice(product.price)}</TableCell>
              <TableCell align="right">{asPrice(product.quantity*product.price)}</TableCell>
              <TableCell align="right" size="small">
                <IconButton
                  aria-label="delete" 
                  variant="contained"
                  color="primary"
                  onClick={() => deleteProduct(product.id)}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
            )) }
            <TableRow>
              <TableCell colSpan={1} />
              <TableCell colSpan={2}>
                <Typography variant="h6">Subtotal</Typography>
              </TableCell>
              <TableCell align="right" colSpan={2}>
                <Typography variant="h6">{cart && asPrice(cart.total)}</Typography>
              </TableCell>
            </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Grid container justify="center" align="center">
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => goToHome()}
            >
              <ArrowBackIosIcon />
              Seguir comprando
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => goToCheckout()}
            >
              Pagar
              <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Cart;
